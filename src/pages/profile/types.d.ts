type ProfileInfo = {
  label: string;
  value: () => string | undefined;
};
type ProfilePageProps = {
  img: IImage;
  name: () => string;
  profileInfo: ProfileInfo[];
  onLogout: () => void;
  changePassword: () => void;
  user?: PickType<State, 'user'>;
  backLinkSlot: () => BlockSlot;
};
