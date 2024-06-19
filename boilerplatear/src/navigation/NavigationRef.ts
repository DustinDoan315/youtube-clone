import router from './router';
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef: any = createNavigationContainerRef();

const rootNavigate = (
  rootName: string,
  screenName: string,
  screenParams?: object,
): any => {
  navigationRef.navigate(rootName, {
    screen: screenName,
    params: screenParams,
  });
};
interface Root {
  goBack: () => void;
  navigate: (screenName: string, screenParams?: object) => void;
}

interface RootContainer {
  navigate: (screenName: string, screenParams?: object) => void;
}

export const root: Root = {
  goBack: () => navigationRef.current?.goBack(),
  navigate: (screenName, screenParams) => {
    navigationRef.current?.navigate(screenName, screenParams);
  },
};

export const bottomRoot: RootContainer = {
  navigate: (screenName, screenParams?: object) => {
    rootNavigate(router.BOTTOM_CONTAINER, screenName, screenParams);
  },
};

export const commonRoot: RootContainer = {
  navigate: (screenName, screenParams?: object) => {
    rootNavigate(router.COMMON_CONTAINER, screenName, screenParams);
  },
};

export function reset(index: number, name: string): void {
  navigationRef.current?.reset({
    index,
    routes: [{name}],
  });
}
