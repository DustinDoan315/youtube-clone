declare module 'react-native-config' {
  export interface NativeConfig {
    API_DEV_KEY?: string;
    API_UAT_KEY?: string;
    API_PROD_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
