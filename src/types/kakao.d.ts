interface Kakao {
  maps: {
    load(callback: () => void): void;
    LatLng: new (
      lat: number,
      lng: number,
    ) => {
      getLat: () => number;
      getLng: () => number;
    };
    Map: new (container: HTMLElement, options: Record<string, unknown>) => object;
    Marker: new (options: Record<string, unknown>) => object;
  };
}

interface Window {
  kakao: Kakao;
}
