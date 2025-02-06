import { CesiumMap } from "@/components/CesiumMap";
import { ConversationBox } from "@/components/ConversationBox";
import { WeatherMetrics } from "@/components/WeatherMetrics";

const Index = () => {
  const weatherMetrics = [
    { type: "rain", value: 25, unit: "mm" },
    { type: "wind", value: 15, unit: "km/h" },
    { type: "clear", value: 28, unit: "°C" }
  ];

  return (
    <div className="w-full h-full overflow-hidden">
      <CesiumMap />
      <WeatherMetrics metrics={weatherMetrics} />
      <ConversationBox />
    </div>
  );
};

export default Index;