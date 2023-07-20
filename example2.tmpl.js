export const layout = "layout.njk";
export const ondemand = true;

export default function ({ params }) {
  return `Hello ${params?.name || "World"} from JavaScript!`;
}
