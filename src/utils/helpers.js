import { Cloudinary } from '@cloudinary/url-gen';

export function dateDiff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export function getCloudinaryImg(publicId) {
  return getCloudinaryInstance().image(publicId);
}

function getCloudinaryInstance() {
  return new Cloudinary({
    cloud: {
      cloudName: 'dbphswmvf',
    },
  });
}
