interface Kakao {
  maps: {
    load(callback: () => void): void;
    LatLng: new (lat: number, lng: number) => kakao.maps.LatLng;
    Map: new (container: HTMLElement, options: kakao.maps.MapOptions) => kakao.maps.Map;
    Marker: new (options: kakao.maps.MarkerOptions) => kakao.maps.Marker;
  };
}

interface Window {
  kakao: Kakao;
}
