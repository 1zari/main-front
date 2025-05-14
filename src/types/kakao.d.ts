declare global {
  interface Window {
    kakao: {
      maps: {
        load(callback: () => void): void;
        LatLng: new (lat: number, lng: number) => kakao.maps.LatLng;
        Map: new (container: HTMLElement, options: kakao.maps.MapOptions) => kakao.maps.Map;
        Marker: new (options: kakao.maps.MarkerOptions) => kakao.maps.Marker;
      };
    };
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: "feed";
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: {
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }[];
        }) => void;
      };
    };
  }
}

export {};
