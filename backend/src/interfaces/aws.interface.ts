export interface AwsConfig {
    region         : string;
    accessKeyId    : string;
    secretAccessKey: string;
};
  
export interface S3Params {
    Bucket  : string;
    Key     : string;
}

export interface S3ParamsSetFile extends S3Params {
    Body       : Buffer;
    ContentType: 'image' | 'audio/mp3' | 'video/mp4' | 'audio/mpeg';
}
  
  