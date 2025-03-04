import theme, {GlobalToken} from 'antd/es/theme';

interface UseThemeToken {
  (): [token: GlobalToken];
}
const useThemeToken: UseThemeToken = () => {
  const {useToken} = theme;
  const {token} = useToken();
  return [token];
};

export default useThemeToken;
