import { UserImageDetailModel } from '../../../models/store/image-detail-model';

const ResetStore = () => {
  UserImageDetailModel.setImageDetails({
    id: '',
    title: '',
    server: '',
    secret: '',
  });
};

export default ResetStore;
