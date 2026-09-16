import { resume } from "../assets";

export function downloadResume() {
  const a = document.createElement("a");
  a.href = resume;
  a.download = "Joshua_OLeary_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
