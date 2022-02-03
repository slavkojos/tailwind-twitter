import Reply from "../public/assets/svgexport-22.svg";
import Retweet from "../public/assets/svgexport-23.svg";
import Like from "../public/assets/svgexport-24.svg";
import Share from "../public/assets/svgexport-25.svg";
import Liked from "../public/assets/svgexport-32.svg";
export default function TweetActionIcon({ icon }) {
  switch (icon) {
    case "reply":
      return <Reply alt="reply" />;
    case "retweet":
      return <Retweet alt="retweet" />;
    case "like":
      return <Like alt="like" />;
    case "share":
      return <Share alt="share" />;
    case "liked":
      return <Liked alt="liked" />;
  }
}
