import CesiumMap from "@/components/CesiumMap";
import { ConversationBox } from "@/components/ConversationBox";

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <CesiumMap />
      <ConversationBox />
    </div>
  );
};

export default Index;