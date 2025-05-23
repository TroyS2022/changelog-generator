import express from "express";
import { getClosedPRs } from "../github_api/main.js";
import { parseGitHubUrl } from "./utils.js";
const app = express();

app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/github", async (req, res) => {
  try {
    const { accessToken, repoUrl } = req.body;
    if (!accessToken || !repoUrl) {
      return res.status(400).json({ error: "Missing accessToken or repoUrl" });
    }
    const { owner, repo } = parseGitHubUrl(repoUrl);
    const data = await getClosedPRs(owner, repo, accessToken);
    //send prs back to users
    res.json(data);
    return;
  } catch (error) {
    res.json(error);
  }
});

app.post("/makeCommit", async (req, res) => {
  //get list of prs
  try {
    const { prList, accessToken, repoUrl } = req.body;
    if (!Array.isArray(prList)) {
      throw new Error("prs not an array");
    }
    //take list of prs
    //fetch diffs
    // call llm
    // make commit with llm output
    res.json({ success: true });
  } catch (error) {
    res.json(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
