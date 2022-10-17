interface IPhoto {
  img: PhotoProps;
}

type PhotoProps = {
  src: Nullable<string>;
  alt: string;
};
