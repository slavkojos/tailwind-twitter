import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../utils/supabase";

export const fetchMessages = createAsyncThunk("messages/fetchAll", async (userID) => {
  try {
    let { data: messages, error } = await supabase
      .from("conversations")
      .select("id,send_time,content,media,seen_time,sender:conversations_sender_id_fkey(*),recipient:conversations_recipient_id_fkey(*)")
      .or(`sender_id.eq.${userID},recipient_id.eq.${userID}`);
    if (error) throw error;
    // const outgoingMessages = messages.map((message) => message.sender.id === userID);
    // const incomingMessages = messages.map((message) => message.recipient.id === userID);
    if (messages.length < 1) return messages;
    const grouped = messages.reduce((groups, message) => {
      const type = message.recipient.id === userID ? "sender" : "recipient";
      const group = groups[message[type].id] || [];
      group.push(message);
      groups[message[type].id] = group;
      return groups;
    }, []);
    return Object.values(grouped);
  } catch (error) {
    console.error(error.error_description || error.message);
  }
});

export const handleSendMessage = createAsyncThunk("messages/send", async ({ realRecipient, message, userID, index }) => {
  console.log("userID", message);
  try {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ sender_id: supabase.auth.user().id, recipient_id: realRecipient.id, content: message }]);
    if (error) throw error;
    //alert("Message sent!")
    const { data: record, error: selectError } = await supabase
      .from("conversations")
      .select("id,send_time,content,media,seen_time,sender:conversations_sender_id_fkey(*),recipient:conversations_recipient_id_fkey(*)")
      .eq("id", data[0].id);
    if (selectError) throw new Error(selectError);
    return { message: record[0], index: index };
    // setMessages((prevState) => {
    //   const messages = prevState;
    //   messages[selectedConversation].push(record[0]);
    //   return messages;
    // });
  } catch (error) {
    console.error(error.error_description || error.message);
  }
});

export const messagesSlice = createSlice({
  name: "messages",
  initialState: { messages: [], loading: "idle" },
  reducers: {
    // pushNewMessage: (state, action) => {
    //   state.messages.push(action.payload);
    // },
    handleInboxMessage: (state, action) => {
      let message = action.payload;
      console.log("message: " + message);
      const messages = state.messages;
      const conversationIndex = messages.findIndex((m) => m[0].recipient.id === message.sender_id || m[0].sender.id === message.sender_id);
      const recipient =
        message.recipient_id === messages[conversationIndex][0].recipient.id
          ? messages[conversationIndex][0].recipient
          : messages[conversationIndex][0].sender;
      const sender =
        messages[conversationIndex][0].sender.id === recipient.id ? messages[conversationIndex][0].recipient : messages[conversationIndex][0].sender;
      message.sender = sender;
      message.recipient = recipient;
      state.messages[conversationIndex].push(message);
    },
  },
  extraReducers: {
    [fetchMessages.fulfilled]: (state, action) => {
      state.loading = "loaded";
      state.messages = action.payload;
    },
    [fetchMessages.pending]: (state, action) => {
      state.loading = "loading";
    },
    [fetchMessages.rejected]: (state, action) => {
      state.loading = "failed";
    },
    [handleSendMessage.fulfilled]: (state, action) => {
      state.loading = "loaded";
      state.messages[action.payload.index].push(action.payload.message);
    },
  },
});
export const { handleInboxMessage } = messagesSlice.actions;
export default messagesSlice.reducer;

// const handleInboxMessage = (message) => {
//   message = JSON.parse(message);
//   setMessages((prevState) => {
//     console.log("prevState: ", prevState);
//     const conversationIndex = prevState.findIndex((m) => {
//       //console.log("message inside findIndex: ", m, message.sender_id);
//       return m[0].recipient.id === message.sender_id || m[0].sender.id === message.sender_id;
//     });
//     console.log("conversationIndex: ", conversationIndex);
//     // if (conversationIndex === -1) {
//     //   console.log("FIRST CONVERSTAION");
//     //   const firstConversation = prevState[0].push(message);
//     //   return [...firstConversation];
//     // }
//     console.log("pushing messagge", message.content);

//     const recipient =
//       message.recipient_id === prevState[conversationIndex][0].recipient.id
//         ? prevState[conversationIndex][0].recipient
//         : prevState[conversationIndex][0].sender;
//     const sender =
//       prevState[conversationIndex][0].sender.id === recipient.id
//         ? prevState[conversationIndex][0].recipient
//         : prevState[conversationIndex][0].sender;
//     console.log("sender", sender);
//     message.sender = sender;
//     message.recipient = recipient;
//     const end = prevState[conversationIndex].length;
//     prevState[conversationIndex][end] = message;
//     console.log("prevState after pushing:  ", prevState);
//     return prevState;
//   });
// };
