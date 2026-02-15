import Article from "@/components/ui/Article";
import Demos from "./components/Demos";

export default function Home() {
  return (
    <main className="py-10">
      <Article>
        <h1>項目展示</h1>
        <Demos />
      </Article>
    </main>
  );
}
