import { Router } from 'express';
import multer from 'multer';
import { showPosts, getPost, addPost, getImage} from "../controller/posts.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../server/uploads'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

const router = Router();
const upload = multer({ storage: storage });

router.get("/", showPosts);
router.get("/:id", getPost);
router.post("/",upload.single("image"), addPost);
router.get("/images/:id", getImage);
export default router;
