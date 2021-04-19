export default class {
  private pixelId: string;
  private trackingAllowed: boolean;

  constructor(pixelId: string, trackingAllowed: boolean) {
    this.pixelId = pixelId;
    this.trackingAllowed = trackingAllowed;
  }

  sendEvent = (event: 'InitiateCheckout' | 'StartTrial' | 'Subscribe') => {
    if (this.trackingAllowed) {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          const fbOptions = {
            autoConfig: false, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
            debug: false, // enable logs
          };

          ReactPixel.init(this.pixelId, null, fbOptions);
          ReactPixel.track(event);
        });
    }
  };
}
