import { formatDate } from './utils';

const getProjectInfo = function () {
  // 获取时间
  const buildTime = formatDate(new Date());

  return {
    buildTime,
  };
};

export default getProjectInfo;
