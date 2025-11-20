import { gD } from './dependencies/utils';
import { console_log } from './configurations/debug.config';
import pathAnalyzer from './pathanalyzer.js';

function inAppNotification() {
  var dataToRepresent = {},
    video = null;

  // Use requestAnimationFrame for better performance
  function deferredInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        requestAnimationFrame(init);
      });
    } else {
      requestAnimationFrame(init);
    }
  }
  
  deferredInit();

  function createInAppStyle() {
    try {
      function addStyle(styles) {
        var css = document.createElement('style');
        css.type = 'text/css';
        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName('head')[0].appendChild(css);
      }
      if (!document.querySelector('script[src*="inAppNotificationCss.js"]')) {
        // Use async loading with timeout to prevent blocking
        Promise.race([
          window.ReWebSDK.utils
          .importModule('/inAppNotificationCss.js')
          .then(() => {
            if (!!window.inappCss) {
              addStyle(window.inappCss);
            }
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
        ]).catch(() => {
          // Fallback: continue without styles if loading fails
          console.warn('CSS loading timed out, continuing without styles');
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  function init() {
    createInAppStyle();
  }

  var ResulticksPagePush = {};
  var autoincrement = 0;
  var shownMsg = [];
  
  // Cache DOM queries
  var containerCache = null;
  var bodyCache = document.body;
  
  ResulticksPagePush.show = function (options, msgId) {
    let addToCartFlag = false;

    //this Function is return only for Demo purpose in resul 5.0 live
    if (
      window?.ReWebSDK?.userRegister_payloadDefault?.tenantId ==
        '356dc684_d610_4f6a_861c_697f19e78e9f' &&
      window.location.origin ==
        window?.ReWebSDK?.utils?.gD(
          'e$kaHR0cHM6Ly92aXNpb25pbnN1cmFuY2VsbGMucmVzdWx0aWNrcy5uZXQ=ek'
        )
    ) {
      if (options?.edm) {
        try {
          const edmUrl = new URL(options.edm); // This throws if not a valid URL
          const urlParams = edmUrl.searchParams;

          // Extract values
          var cid = urlParams.get('cid');
          var depid = urlParams.get('dbid');
          var tid = urlParams.get('tid');
          var bid = urlParams.get('bid');
          var sid = urlParams.get('sid');
          var did = urlParams.get('did');
          var rid = urlParams.get('rid');

          // Build cookieTemplate
          let cookieTemplate = [
            {
              Did: did,
              Dbid: depid,
              Tid: tid,
              Bid: bid,
              Cid: cid,
              Sid: sid,
              Rid: rid,
              Chnl: '',
              Dtx: new Date(),
              Pid: urlParams.get('pid') || null,
            },
          ];

          pathAnalyzer.createCookie(
            'ResData',
            JSON.stringify(cookieTemplate),
            1
          );
        } catch (e) {
          console.warn('Invalid EDM URL provided:', options.edm);
        }
      }
    }

    try {
      window.addEventListener('message', (event) => {
        try {
          let data = JSON.parse(event.data);
          let method = data.method;
          let smartLink = options.click_actions;
          let selectors = data.script.split(';');
          if (
            window._currentTenant._tenantId !=
            '6da5fc51_c42d_4616_9f68_b80a2f37f335'
          ) {
            selectors.forEach((selector) => {
              try {
                if (!!selector) {
                  try {
                    RPagePush.hide();
                    let element = new Function(`return ${selector}`);
                    let elementInvoke = element();
                    elementInvoke.click();
                    window.ReWebSDK.methods.clientApiService
                      .inAppNotificationTracking('opened', '2', msgId)
                      .then((response) => {})
                      .catch((err) => {
                        window.postMessage({
                          eventName: 'Res_webCampaignTrackingError',
                          status: err.status ? err.status : '',
                          error: 'inAppNotification.js: ' + err.toString(),
                        });
                      });
                  } catch (error) {
                    console.log('Error occurred while clicking');
                  }
                }
              } catch (error) {
                console.log('Error occurred while targeting');
              }
            });
          } else {
            selectors.forEach((selector) => {
              try {
                if (selector && smartLink) {
                  try {
                    RPagePush.hide();
                    let Prod_URL = window.location.href;
                    let newStr = selector.replace(
                      'Prod_ID',
                      `${Prod_URL.split('/').pop().split('.')[0]}`
                    );
                    let fn = new Function(`return ${newStr}`);
                    let a = fn();
                    addToCartFlag = true;
                    a.click();
                    window.ReWebSDK.methods.clientApiService
                      .inAppNotificationTracking('opened', '2', msgId)
                      .then((response) => {})
                      .catch((err) => {
                        window.postMessage({
                          eventName: 'Res_webCampaignTrackingError',
                          status: err.status ? err.status : '',
                          error: 'inAppNotification.js: ' + err.toString(),
                        });
                      });
                    try {
                      let script = document.createElement('iframe');
                      script.src = smartLink;
                      script.style.display = 'none';
                      document.body.appendChild(script);
                      script.onload = () => {
                        setTimeout(() => {
                          script.remove();
                          ReWebSDK.conversionTracking();
                        }, 10000);
                      };
                      script.onerror = () => {};
                    } catch (error) {}
                  } catch (error) {
                    console.log('Error: ', error);
                  }
                }
              } catch (error) {}
            });
          }
        } catch (error) {}
      });
    } catch (error) {}

    var container = document.createElement('div');
    container.id = 'ResulticksPagePush-container';
    var joanText = options.text;
    if (
      _currentTenant._tenantId == '6da5fc51_c42d_4616_9f68_b80a2f37f335' &&
      joanText.includes('people viewing this product')
    ) {
      container.className =
        'ResulFlex joannContainer Resulticks-inapp-' +
        (options.placement || 'bottom-right');
    } else {
      container.className =
        'ResulFlex Resulticks-inapp-' + (options.placement || 'bottom-right');
    }

    // Use cached body reference
    bodyCache.appendChild(container);
    containerCache = container;

    if (!!options.cid) {
      ReWebSDK.utils.inAppCampID = options.cid;
    }

    // Use cached container reference
    containerCache.insertAdjacentHTML(
        'afterbegin',
        `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" crossorigin="anonymous" />`
      );

    var RPagePush = document.createElement('div');
    if (options.contentBgColor && !!options.contentBgColor) {
      RPagePush.style.backgroundColor = options.contentBgColor;
    }
    RPagePush.id = ++autoincrement;
    RPagePush.id = 'RPagePush-' + RPagePush.id;
    RPagePush.className = 'ResulticksPagePush-RPagePush';

    var closeButton = document.createElement('span');
    closeButton.innerHTML = `×`;
    closeButton.className = 'ResulticksCloseIcon';
    if (options.contentBgColor && !!options.contentBgColor) {
      closeButton.style.backgroundColor = options.contentBgColor;
    }
    closeButton.onclick = (event) => {
      if (
        window._currentTenant._tenantId ==
        '22f5edd7_e3e7_4c50_868d_4b28f4e83f4d'
      ) {
        window.ReWebSDK.utils.SSH.removeItem('vg3InpagePresent');
      }
      sessionStorage.removeItem('Resul_inAppShown');
      window.ReWebSDK.methods.clientApiService
        .inAppNotificationTracking('dismiss', '3', msgId)
        .then((response) => {})
        .catch((err) => {
          window.postMessage({
            eventName: 'Res_webCampaignTrackingError',
            status: err.status ? err.status : '',
            error: 'inAppNotification.js: ' + err.toString(),
          });
        });
      RPagePush.hide();
      event.stopPropagation(event);
      try {
        window.ResPopupClose();
      } catch (error) {}
    };

    window.ResPopupClose = function (event) {
      sessionStorage.removeItem('Resul_inAppShown');
      removeResulticksPagePush();
      event.stopPropagation();
    };

    var flexBox = document.createElement('div');
    var ButtonBox = document.createElement('div');
    flexBox.className = 'Resul-flex';
    ButtonBox.className = 'Resul-flex Resul-ButtonBox';

    flexBox.appendChild(closeButton);

    if (!!options.hasOwnProperty('icon') && !!options.icon) {
      var iconWrapper = document.createElement('div');
      iconWrapper.id = 'Resul-icon-wrapper';
      flexBox.appendChild(iconWrapper);
    }

    var contentwrapper = document.createElement('div');
    contentwrapper.className = 'ResulBodyContentWrapper';
    contentwrapper.style.color = options.contentBgColor;
    flexBox.appendChild(contentwrapper);
    console_log('options', options);

    if (options.title) {
      var h4 = document.createElement('h4');
      h4.className = 'ResulticksPagePush-title';
      h4.innerHTML = options.title;
      h4.title = options.title;
      h4.style.color = options.titleColor || '#000';
      if (!options.edm) {
        contentwrapper.appendChild(h4);
      }
    }

    if (
      _currentTenant._tenantId == '6da5fc51_c42d_4616_9f68_b80a2f37f335' &&
      joanText.includes('people viewing this product')
    ) {
      if (options.text) {
        var p = document.createElement('p');
        p.className = 'ResulticksPagePush-text';
        p.innerHTML = "<span id='ResulJoannLiveCount'></span> " + options.text;
        p.title = options.text;
        p.style.color = options.bodyColor || '#333';
        if (!options.edm) {
          contentwrapper.appendChild(p);
        }
      }
    } else {
      if (options.text) {
        var p = document.createElement('p');
        p.className = 'ResulticksPagePush-text';
        p.innerHTML = options.text;
        p.title = options.text;
        p.style.color = options.bodyColor || '#333';
        if (!options.edm) {
          contentwrapper.appendChild(p);
        }
      }
    }

    if (options.productLiveVisit) {
      var p = document.createElement('p');
      p.className = 'ResulticksPagePush-liveVisit';
      p.innerHTML = `&#128065 <span id="ResulJoannLiveCount"></span> User'(s)`;
      p.style.color = options.bodyColor || '#333';
      if (!options.edm) {
        contentwrapper.appendChild(p);
      }
    }
    RPagePush.appendChild(flexBox);

    if (options.image) {
      let wrapper = document.createElement('div');
      wrapper.className = 'resulContentWarpper';
      var img = document.createElement('img');
      // Add loading optimization
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = options.image;
      img.className = 'ResulticksPagePush-image';
      wrapper.appendChild(img);
      RPagePush.appendChild(wrapper);
    } else if (
      !options.image &&
      !!options.placement &&
      !options.placement.includes('banner') &&
      !options.edm
    ) {
      let wrapper = document.createElement('div');
      wrapper.className = 'resulContentWarpper';
      let img = document.createElement('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = gD(
        'dkkaHR0cHM6Ly9zZGsucmVzdS5pby9pbWFnZXMvaW1nTm90Rm91bmQuc3Zndk'
      );
      img.style.backgroundColor = 'white';
      img.style.filter = 'invert(27%) brightness(130%)';
      img.className = 'ResulticksPagePush-image';
      wrapper.appendChild(img);
      RPagePush.appendChild(wrapper);
    }

    if (options.edm) {
      try {
        let container = document.getElementById('ResulticksPagePush-container');
        container.style.display = 'none';
      } catch (error) {}
    }

    try {
      if (
        options.isOverlay &&
        (options.isOverlay == 'true' || options.isOverlay == true)
      ) {
        try {
          // Use cached container reference
          containerCache.style.background = options.overlayColor;
          containerCache.style.pointerEvents = 'auto';
        } catch (error) {}
      } else {
        containerCache.style.pointerEvents = 'none';
      }
    } catch (error) {}

    if (options.edm) {
      let wrapper = document.createElement('div');
      wrapper.className = 'resulContentWarpper';
      var iframe = document.createElement('iframe');
      
      // Use AbortController for better performance control
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      fetch(options.edm, { signal: controller.signal })
        .then((res) => res.text())
        .then((res) => {
          clearTimeout(timeoutId);
          options.title = '';
          options.text = '';
          iframe.className = 'ResulticksPagePush-edm';
          iframe.id = 'iframe_EDM';
          wrapper.appendChild(iframe);
          RPagePush.appendChild(wrapper);

          if (options.placement !== 'fullscreen') {
            if (options?.actions?.length > 0) {
              iframe.style.height = '80vh';
              iframe.style.maxHeight = '350px';
            } else {
              iframe.style.height = '100vh';
              iframe.style.maxHeight = '450px';
            }
          }

          if (options.placement == 'fullscreen') {
            if (options?.actions?.length > 0) {
              iframe.style.height = '80vh';
            } else {
              iframe.style.height = '98vh';
            }
          }

          let _frame = document.querySelector('iframe.ResulticksPagePush-edm');
          let _frameContainer = containerCache;
          _frameContainer.style.display = 'none';
          _frame.contentDocument.write(res);
          _frame.contentWindow.document.close();

          function removePopup(event) {
            try {
              if (!addToCartFlag) {
                window.ReWebSDK.methods.clientApiService
                  .inAppNotificationTracking('dismiss', '3', msgId)
                  .then((response) => {})
                  .catch((err) => {
                    window.postMessage({
                      eventName: 'Res_webCampaignTrackingError',
                      status: err.status ? err.status : '',
                      error: 'inAppNotification.js: ' + err.toString(),
                    });
                  });
              }
              if (!!document.querySelector('.ResulticksPagePush-edm')) {
                document
                  .querySelector('.ResulticksPagePush-edm')
                  .contentWindow.document.querySelector('a#popupCloseIcon')
                  .click();
              }
              document.removeEventListener('click', removePopup);
            } catch (error) {}
          }

          _frame.addEventListener('load', function () {
            // Use requestAnimationFrame instead of setTimeout for better performance
            requestAnimationFrame(() => {
              try {
                try {
                  if (
                    _currentTenant._tenantId ==
                      '6da5fc51_c42d_4616_9f68_b80a2f37f335' &&
                    window.ReWebSDK.utils.browserName == 'Mozilla Firefox'
                  ) {
                    let selector = document.getElementById('iframe_EDM');
                    if (
                      !selector.style.height ||
                      !selector.style.width ||
                      selector.style.height == '0px' ||
                      selector.style.width == '0px'
                    ) {
                      try {
                        selector.style.height =
                          selector.contentWindow.document.getElementById(
                            'rpTemplateContainer'
                          ).style.height;
                        selector.style.width =
                          selector.contentWindow.document.getElementById(
                            'rpTemplateContainer'
                          ).style.width;
                      } catch (error) {}
                    }
                  }
                } catch (error) {}
                _frameContainer.style.display = 'flex';

                try {
                  containerCache.style.display = 'flex';
                } catch (error) {}

                try {
                  let closeIcon = document
                    .querySelector('.resulContentWarpper iframe')
                    .contentWindow.document.querySelector(
                      '#templateCloseAsIcon'
                    );
                  if (
                    _currentTenant._tenantId ==
                      '6da5fc51_c42d_4616_9f68_b80a2f37f335' &&
                    closeIcon
                  ) {
                    closeIcon.addEventListener('click', (event) => {
                      window.ReWebSDK.methods.clientApiService
                        .inAppNotificationTracking('dismiss', '3', msgId)
                        .then((response) => {})
                        .catch((err) => {
                          window.postMessage({
                            eventName: 'Res_webCampaignTrackingError',
                            status: err.status ? err.status : '',
                            error: 'inAppNotification.js: ' + err.toString(),
                          });
                        });
                      document.removeEventListener('click', removePopup);
                    });
                  }
                } catch (error) {}

                try {
                  if (
                    _currentTenant._tenantId ==
                    '6da5fc51_c42d_4616_9f68_b80a2f37f335'
                  ) {
                    document.addEventListener('click', removePopup);
                  } else if (
                    _currentTenant._tenantId ==
                    'c3516bc5_a869_42ae_9c73_00d5dacff25f'
                  ) {
                    try {
                      RPagePush.removeEventListener(
                        'click',
                        RPagePushClickListener
                      );
                      let tempWrapper = document.querySelector(
                        '.resulContentWarpper'
                      );
                      closeButton.style.display = 'flex';
                      closeButton.style.setProperty('top', '0px', 'important');
                      tempWrapper.style.width = 'auto';
                      tempWrapper.style.setProperty(
                        'width',
                        'auto',
                        'important'
                      );
                      tempWrapper.appendChild(closeButton);
                      let element = document
                        .getElementById('iframe_EDM')
                        .contentWindow.document.querySelector(
                          '.popupContainer'
                        );
                      let iframe = document.getElementById('iframe_EDM');
                      iframe.contentWindow.document.body.style.backgroundColor =
                        'transparent';
                      iframe.style.width = element.offsetWidth + 20 + 'px';
                      iframe.style.height = element.offsetHeight + 23 + 'px';
                      let fullScreenClass = document.querySelector(
                        '.ResulticksPagePush-fullscreen'
                      );
                      fullScreenClass.style.width = 'auto';
                    } catch (error) {}
                  }
                } catch (error) {}

                try {
                  let getInnermostTextNode = (element) => {
                    if (element.childNodes.length === 0) {
                      return element;
                    } else {
                      return getInnermostTextNode(element.lastChild);
                    }
                  };
                  let targetElement = document
                    .getElementById('iframe_EDM')
                    .contentWindow.document.getElementById('lvTag');
                  getInnermostTextNode(targetElement).textContent =
                    window.productViewCountGlobal ? productViewCountGlobal : 1;
                  setInterval(() => {
                    try {
                      getInnermostTextNode(targetElement).textContent =
                        window.productViewCountGlobal
                          ? productViewCountGlobal
                          : 1;
                    } catch (error) {}
                  }, 500);
                } catch (error) {}

                if (
                  window._currentTenant._tenantId ==
                  '386364b9_2e1c_4f99_b902_7a702be8c795'
                ) {
                  if (!!window.SixZ4EdmListener) {
                    try {
                      const { edmListener } = window.SixZ4EdmListener;
                      edmListener(closeButton, RPagePush, msgId, options.edm);
                    } catch (error) {}
                  } else {
                    window.ReWebSDK.utils
                      .importModule(
                        '/clientSpecificFiles/6z4Module/6z4.edmListener.js'
                      )
                      .then((response) => {
                        if (!!window.SixZ4EdmListener) {
                          try {
                            const { edmListener } = window.SixZ4EdmListener;
                            edmListener(
                              closeButton,
                              RPagePush,
                              msgId,
                              options.edm
                            );
                          } catch (error) {}
                        }
                      })
                      .catch((err) => {
                        console_log(
                          'Error occurred while fetching 6z4.edmListener.js'
                        );
                      });
                  }
                } else if (
                  window._currentTenant._tenantId ==
                  '7301417b_a775_44b2_9fb5_db8fbddd35f4'
                ) {
                  if (!!window.fgxModule) {
                    try {
                      const { edmListener } = window.fgxModule;
                      edmListener(closeButton, RPagePush);
                    } catch (error) {}
                  }
                }

                try {
                  if (
                    document
                      .querySelector('#iframe_EDM')
                      .contentDocument.querySelector(
                        `a[href*='https://www.youtube.com']`
                      )
                  ) {
                    try {
                      let ytUrl = document
                        .querySelector('#iframe_EDM')
                        .contentDocument.querySelector(
                          `a[href*='https://www.youtube.com']`
                        )
                        .getAttribute('href');
                      let endPoint =
                        ytUrl.split('/')[ytUrl.split('/').length - 1];
                      let videoId = endPoint.split('&')[0].split('=')[1];
                      let videoURL = `https://www.youtube.com/embed/${videoId}`;
                      document
                        .querySelector('#iframe_EDM')
                        .contentDocument.querySelector(
                          `a[href*='https://www.youtube.com']`
                        )
                        .setAttribute('href', videoURL);
                    } catch (error) {}
                  }
                } catch (error) {}
              } catch (error) {}
            });

            document.getElementsByClassName(
              'ResulticksCloseIcon'
            )[0].style.display = ' none';
          });

          if (options.actions && !!options.actions.length) {
            RPagePush.appendChild(ButtonBox);
          }
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          console.warn('EDM loading failed:', error);
          // Continue with fallback behavior
        });

      containerCache.classList.add('tbn');
      flexBox.style.display = 'none';
      if (options.actions && !options.actions.length) {
        RPagePush.style.backgroundColor = 'transparent';
      }
    }

    if (options.video) {
      let wrapper = document.createElement('div');
      wrapper.className = 'resulContentWarpper';

      if (options.video.indexOf('youtu') > -1) {
        video = document.createElement('iframe');
        if (options.video.indexOf('watch?v=') > -1) {
          video.src = options.video.replace('watch?v=', 'embed/');
        }
      } else {
        video = document.createElement('video');
        video.setAttribute('controls', false);
        video.setAttribute('autoplay', true);
        video.src = options.video;
      }

      video.className = 'ResulticksPagePush-video';
      wrapper.appendChild(video);
      RPagePush.appendChild(wrapper);
    }

    if (options.actions && options.actions.length > 0) {
      options.actions.forEach((value, index) => {
        var button = document.createElement('button');
        button.innerText = value.title;
        button.className = 'ResulticksPagePush-ActionButton';
        if (!!value.actionTextColor) {
          button.style.color = value.actionTextColor;
        }
        if (!!value.actionBgColor) {
          button.style.backgroundColor = value.actionBgColor;
        }
        button.onclick = (event) => handleActions(value, event);
        ButtonBox.appendChild(button);
      });
    }

    if (!!options.hasOwnProperty('banner')) {
      document.getElementById('ResulticksPagePush-container').className =
        'banner-overlay';
      try {
        contentwrapper.style.marginTop = '10px';
      } catch (error) {}
      if (iconWrapper) {
        iconWrapper.className = 'Resul-icon-wrapper';
      }
    }

    if (options.width) {
      RPagePush.style.width = options.width;
    } else {
      switch (options.placement) {
        case 'fullscreen':
          break;

        default:
          if (options.text && options.text.length > 350) {
            RPagePush.style.width = 'auto';
          } else {
            if (
              _currentTenant._tenantId ==
                '6da5fc51_c42d_4616_9f68_b80a2f37f335' &&
              joanText.includes('people viewing this product')
            ) {
              RPagePush.style.width = '190px';
            } else {
              RPagePush.style.width = '360px';
            }
          }
          break;
      }
    }

    if (!!options.icon) {
      function checkImage(url, callback) {
        // Add timeout to image loading
        const img = new Image();
        const timeout = setTimeout(() => {
          callback(false);
        }, 3000);
        
        img.onload = function () {
          clearTimeout(timeout);
          callback(true);
        };
        img.onerror = function () {
          clearTimeout(timeout);
          callback(false);
        };
        img.src = url;
      }

      const imageUrl = options.icon;
      checkImage(imageUrl, function (isValid) {
        if (isValid) {
          var img = document.createElement('img');
          img.loading = 'lazy';
          img.decoding = 'async';
          img.src = options.icon;
          img.className = 'ResulticksPagePush-icon';
          iconWrapper.appendChild(img);
        } else {
          console.warn('Icon image URL is not valid:', imageUrl);
        }
      });
    }

    if (options.height) {
      RPagePush.style.height = options.height;
    }

    if (options.overlay) {
      containerCache.className = 'rp-overlay';
    }

    if (typeof options.callback === 'function') {
      RPagePush.addEventListener('click', options.callback);
    }

    RPagePush.hide = function () {
      RPagePush.className += ' ResulticksPagePush-fadeOut';
      RPagePush.addEventListener(
        'animationend',
        removeResulticksPagePush,
        false
      );
    };

    if (options.timeout) {
      const t = setTimeout(function () {
        RPagePush.hide();
        clearTimeout(t);
      }, options.timeout);
    }

    if (options.type) {
      RPagePush.className += ' ResulticksPagePush-' + options.type;
    }

    if (options.placement) {
      RPagePush.className += ' ResulticksPagePush-' + options.placement;
    }

    function RPagePushClickListener(event) {
      if (!!document.querySelector('#ResulticksPagePush-container video')) {
        document.querySelector('#ResulticksPagePush-container video').src = '';
      }
      RPagePush.hide();
      window.open(options.click_actions || '/', '_blank');
      window.ReWebSDK.methods.clientApiService
        .inAppNotificationTracking('opened', '2', msgId)
        .then((response) => {})
        .catch((err) => {
          window.postMessage({
            eventName: 'Res_webCampaignTrackingError',
            status: err.status ? err.status : '',
            error: 'inAppNotification.js: ' + err.toString(),
          });
        });
    }

    RPagePush.addEventListener('click', RPagePushClickListener);

    const _inappdismiss = () => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        if (!!registrations.length) {
          registrations[0].active.postMessage({ event: 'dismissInapp' });
        }
      });
      sessionStorage.removeItem('Resul_inAppShown');
    };

    window.onbeforeunload = function () {
      console_log('_inappdismiss passed to sw');
      _inappdismiss();
    };

    function handleActions(data, event) {
      console_log(
        'handleActions clicked...!',
        JSON.stringify(data, options.actions)
      );
      RPagePush.hide();
      let { action } = data;
      action = action?.toLowerCase();

      switch (action) {
        case 'dismiss':
          window.ReWebSDK.methods.clientApiService
            .inAppNotificationTracking(action, '3', msgId)
            .then((response) => {})
            .catch((err) => {
              window.postMessage({
                eventName: 'Res_webCampaignTrackingError',
                status: err.status ? err.status : '',
                error: 'inAppNotification.js: ' + err.toString(),
              });
            });
          event.stopImmediatePropagation();
          try {
            if (options.edm) {
              document
                .querySelector('.ResulticksPagePush-edm')
                .contentWindow.document.querySelector('a#popupCloseIcon')
                .click();
            }
          } catch (error) {}
          _inappdismiss();
          break;

        case 'unsubscribe':
          window.ReWebSDK.methods.clientApiService
            .inAppNotificationTracking(action, '8', msgId)
            .then((response) => {})
            .catch((err) => {});
          event.stopImmediatePropagation();
          break;

        case 'later':
          dataToRepresent = options;
          const utc_date = new Date(new Date().toUTCString())
            .toISOString()
            .split('.')[0];
          if (new Date(utc_date) >= new Date(dataToRepresent.ttl)) {
            window.ReWebSDK.methods.clientApiService
              .inAppNotificationTracking('expired', '1', msgId)
              .then((response) => {})
              .catch((err) => {
                window.postMessage({
                  eventName: 'Res_webCampaignTrackingError',
                  status: err.status ? err.status : '',
                  error: 'inAppNotification.js: ' + err.toString(),
                });
              });
          } else {
            ResulticksPagePush.show(dataToRepresent);
          }
          window.ReWebSDK.methods.clientApiService
            .inAppNotificationTracking(action, '4', msgId)
            .then((response) => {})
            .catch((err) => {
              window.postMessage({
                eventName: 'Res_webCampaignTrackingError',
                status: err.status ? err.status : '',
                error: 'inAppNotification.js: ' + err.toString(),
              });
            });
          event.stopImmediatePropagation();
          break;

        case 'resumejourney':
          event.stopImmediatePropagation();
          window.ReWebSDK.resumeJourney().then(
            (res) => {
              console_log('resumeJourney result: ', JSON.stringify(res));
              if (
                !!window.ReWebSDK.resumeJourneyCallback &&
                typeof window.ReWebSDK.resumeJourneyCallback === 'function'
              ) {
                window.ReWebSDK.resumeJourneyCallback(res);
              }
              window.dispatchEvent(
                new CustomEvent('resumeJourneyData', { data: res })
              );
              if (!!res.type) {
              }
            },
            (rej) => {
              console_log('resumeJourney result: ', rej);
            }
          );
          break;

        default:
          const { actionId, actionUrl } = data;
          if (!!document.querySelector('#ResulticksPagePush-container video')) {
            document.querySelector('#ResulticksPagePush-container video').src =
              '';
          }
          window.ReWebSDK.methods.clientApiService
            .inAppNotificationTracking(action, actionId, msgId)
            .then((response) => {})
            .catch((err) => {
              window.postMessage({
                eventName: 'Res_webCampaignTrackingError',
                status: err.status ? err.status : '',
                error: 'inAppNotification.js: ' + err.toString(),
              });
            });
          if (
            _currentTenant._tenantId ==
              '6da5fc51_c42d_4616_9f68_b80a2f37f335' &&
            joanText.includes('people viewing this product')
          ) {
            var Prod_URL = window.location.href;
            document
              .querySelector(
                '[data-pid="' +
                  Prod_URL.split('/').pop().split('.')[0] +
                  '"][data-product-component="add-button"]'
              )
              .click();
            try {
              console.log(actionUrl);
              let script = document.createElement('iframe');
              script.src = actionUrl;
              script.style.display = 'none';
              document.body.appendChild(script);
              script.onload = () => {
                setTimeout(() => {
                  script.remove();
                  ReWebSDK.conversionTracking();
                }, 10000);
              };
              script.onerror = () => {};
            } catch (error) {
              console.log(error);
            }
          } else {
            window.open(actionUrl || '/', '_blank');
          }

          event.stopImmediatePropagation();
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            if (!!registrations.length) {
              registrations[0].active.postMessage({ event: 'dismissInapp' });
            }
          });
          break;
      }
    }

    function removeResulticksPagePush() {
      try {
        if (document.getElementById('ResulticksPagePush-container')) {
          document.getElementById('ResulticksPagePush-container').remove();
        }

        if (options.overlay) {
          document
            .getElementById('ResulticksPagePush-container')
            .classList.remove('rp-overlay');
        }
        _inappdismiss();
      } catch (error) {}
    }

    if (!options.edm) {
      if (options.actions && !!options.actions.length) {
        RPagePush.appendChild(ButtonBox);
      }
    }

    containerCache.appendChild(RPagePush);
    
    if (
      document.querySelector(
        '#ResulticksPagePush-container #ResulJoannLiveCount'
      )
    ) {
      try {
        window.frames['iframe_EDM'].contentDocument.getElementById(
          'lvTag'
        ).innerHTML = window.productViewCountGlobal
          ? productViewCountGlobal
          : 1;
      } catch (error) {}
      document.querySelector(
        '#ResulticksPagePush-container #ResulJoannLiveCount'
      ).innerHTML = window.productViewCountGlobal ? productViewCountGlobal : 1;
    }
    return RPagePush;
  };
  return ResulticksPagePush;
}
window.inAppNotification = inAppNotification;
