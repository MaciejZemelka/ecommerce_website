import type { Metadata } from "next";
import Home from "./homepage/page";

export default function IndexPage() {
  return <Home />;
}

export const metadata: Metadata = {
  title: "Maciej Zemelka",
};