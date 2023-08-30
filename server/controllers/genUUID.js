import { v4 as uuidv4 } from 'uuid';

const genUUID = async (req,res) => {
    const a = uuidv4();
    res.json({ a });
}

export default genUUID;