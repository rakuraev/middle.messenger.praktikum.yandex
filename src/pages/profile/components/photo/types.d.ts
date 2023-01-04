interface IPhoto {
  img: PhotoProps;
}

type PhotoProps = {
  src: Nullable<string>;
  alt: string;
  events: {
    change: (e: Event) => void;
  };
};

interface IImage {
  src: () => Nullable<string> | Nullable<string>;
  alt: string;
}
