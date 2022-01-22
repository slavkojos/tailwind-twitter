import Reply from "../public/assets/svgexport-22.svg";
import Retweet from "../public/assets/svgexport-23.svg";
import Like from "../public/assets/svgexport-24.svg";
import Share from "../public/assets/svgexport-25.svg";
export default function TweetActionIcon({ icon }) {
  if (icon === "reply") {
    return <Reply alt="reply" />;
  } else if (icon === "retweet") {
    return <Retweet alt="retweet" />;
  } else if (icon === "like") {
    return <Like alt="like" />;
  } else if (icon === "share") {
    return <Share alt="share" />;
  }
}
