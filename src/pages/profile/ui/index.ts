import registerComponent from 'shared/lib/registerComponents';
import ChangePassword from './changePassword';
import { ChangeProfileData } from './changeProfileData';
import Photo from './photo';

registerComponent(ChangePassword);
registerComponent(Photo);
registerComponent(ChangeProfileData);

export { ChangePassword, Photo, ChangeProfileData };
