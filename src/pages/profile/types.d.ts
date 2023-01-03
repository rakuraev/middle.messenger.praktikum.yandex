
type ProfileInfo = {
  label: string;
  value: string;
};
type ProfilePageProps = {
  img: IImage;
  name: string;
  profileInfo: ProfileInfo[];
  user?: Pick<State, 'user'>;
  onLogout: () => void;
};
