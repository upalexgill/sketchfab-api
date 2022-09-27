const client = new Sketchfab(document.getElementById('api-frame'));
const client1 = new Sketchfab(document.getElementById('api-frame-1'));
const client2 = new Sketchfab(document.getElementById('api-frame-2'));
const logs = document.getElementById('logs');

(function () {
if (!console) {
  console = {};
}
var old = console.log;
var logger = document.getElementById('log');
console.log = function (message) {
  if (typeof message == 'object') {
      logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
  } else {
      logger.innerHTML += message + '<br />';
  }
}
})();

var error = function error() {
  console.error('Sketchfab API error');
};

var success = function success(api) {
  api.start(function () {
    api.addEventListener('viewerready', function () {
      api.getCameraLookAt(function (err, camera) {

        // createAnnotation( positionStart, positionEnd, eye, target, title, text, [callback] )
          api.createAnnotation(
          camera.position,
          [-0.2778112571409257, 0.07565172590838315, 0.8530773897350069],
          [-0.2, -1, 0.6],
          camera.target,
          'Annotation 1',
          '[More info](# "More info")',
          function(err, index) {
              if (!err) {
                  console.log('Created new annotatation' + (index + 1));
                  api.hideAnnotationTooltips(function(err) {
                    if (!err) {
                      console.log('Hiding annotation tooltip');
                    }
                  });

                  api.createAnnotation(
                    camera.position,
                    [0.37440733174384355, 0.19698893908692625, 0.5987677802444493],
                    [0.3, -1, 0.6],
                    camera.target,
                    'Annotation 2',
                    '[More info](# "More info")',
                    function(err, index) {
                        if (!err) {
                            console.log('Created new annotatation' + (index + 1));
                            api.hideAnnotationTooltips(function(err) {
                              if (!err) {
                                console.log('Hiding annotation tooltip');
                              }
                            });
                        }
                    });
              }
          });

      });

      api.addEventListener('annotationSelect', function(index) {
        console.log('Selected annotation', index);
        if (index === 0) {
          document.getElementById('api-frame-2').classList.remove('is-active');
          document.getElementById('api-frame-1').classList.add('is-active');
        }
        if (index === 1) {
          document.getElementById('api-frame-1').classList.remove('is-active');
          document.getElementById('api-frame-2').classList.add('is-active');
        }

      });

      api.addEventListener('annotationFocus', function(index) {
        console.log('Reached annotation ' + index);
      });
    });
  });
};

client.init('d63dc2f0906d4fd9a12c3da479f12461', {
  success: success,
  error: error,
  preload: 1,
  ui_stop: 0,
  ui_help: 0,
  ui_hint: 0,
  ui_general_controls: 0,
  ui_watermark_link: 0,
  ui_watermark: 0,
});

client1.init('38d0ac822d414970b6d8f151e0494835', {
  preload: 1,
  ui_stop: 0,
  ui_help: 0,
  ui_hint: 0,
  ui_general_controls: 0,
  ui_watermark_link: 0,
  ui_watermark: 0,
});

client2.init('b316c82bd26343dabeada044bdd5aa32', {
  preload: 1,
  ui_stop: 0,
  ui_help: 0,
  ui_hint: 0,
  ui_general_controls: 0,
  ui_watermark_link: 0,
  ui_watermark: 0,
});
