import AsyncHandler from "../utils/AsyncHandler";
import {spawn} from "child_process";

const imageHandler = AsyncHandler(async (req, res) => {
  const imagePath = req.file.path;
  const python = spawn("python3", ["scripts/enhanceImage.py", imagePath]);

});
