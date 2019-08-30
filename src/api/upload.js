import request from '@/request'

export function upload(formdata) {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/upload',
    method: 'post',
    data: formdata
  })
}

const readUploadedFile = (inputFile) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

export async function getBase64(file) {
  let data = await readUploadedFile(file);
  // console.log("data is " + data);
  return data;
}