import { v4 as uuidv4 } from "uuid";

const genUUID = async (req, res) => {
  const roomUUID = uuidv4();
  res.json({ roomUUID });
};

export default genUUID;
