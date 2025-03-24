import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `images/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);

  const url = await getDownloadURL(snapshot.ref);
  console.log("Ảnh đã upload, URL:", url);
  return url;
};

const getImageURL = async (folder, imageName) => {
  const imageRef = ref(storage, `${folder}/${imageName}`);
  try {
    const url = await getDownloadURL(imageRef);
    console.log("URL ảnh:", url);
    return url;
  } catch (error) {
    console.error("Không tìm thấy ảnh:", error);
    return null;
  }
};

export { uploadImage, getImageURL };
