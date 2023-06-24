import OSS from 'ali-oss';

export const client = new OSS({
    region: 'oss-cn-chengdu',
    accessKeyId: 'Your accessKeyId',
    accessKeySecret: 'Your accessKeySecret',
    bucket: 'Your bucket',
});