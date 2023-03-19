interface IPhoto {
  img: PhotoProps;
}

interface IImage {
  src: () => Nullable<string> | Nullable<string>;
  alt: string;
}
