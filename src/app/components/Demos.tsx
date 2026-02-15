import Link from "next/link";
import React from "react";

interface DemoProject {
  title: string;
  description: string;
  link: string;
}

interface DemoOption {
  title: string;
  projects: DemoProject[];
}

const options: DemoOption[] = [
  {
    title: "Hooks",
    projects: [
      { title: "dialog", description: "dialog 控制器", link: "/dialog" },
    ],
  },
];

export default function Demos() {
  function renderItem(item: DemoProject, index: number) {
    return (
      <li key={index}>
        <Link href={item.link}>{item.title}</Link>
        <p>{item.description}</p>
      </li>
    );
  }

  function renderBlock(item: DemoOption, index: number) {
    return (
      <div key={index}>
        <h2>{item.title}</h2>
        <ul>{item.projects.map(renderItem)}</ul>
      </div>
    );
  }

  return <section>{options.map(renderBlock)}</section>;
}
