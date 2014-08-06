/* Requires jQuery and TweenLite */

(function () {

    UI.StepNav = function () {

        var steps = [],
            $parent,
            domParent,
            $wrapper,
            totalSteps = 0,
            currentStep = 0,
            viewWidth = 0,
            viewHeight = 0;

        function init(p) {
            $parent = $(p);

            // store parent element as dom object for events
            p = p.replace('#', '');
            domParent = document.getElementById(p);

            $wrapper = $parent.find('[ui-stepwrapper]:eq(0)');

            //set the css to a value
            $wrapper.css('left', '0');

            // resize contents as needed
            window.onresize = function () {
                setContentSize('ui-step')
            };

            // set initial content size
            setContentSize('ui-step');

            // store the individual steps
            $('[ui-step]').each(function () {
                var $this = $(this);

                // activate any buttons
                $this.find('[ui-next]:eq(0)').click(function () {
                    animate(-1);
                });

                $this.find('[ui-prev]:eq(0)').click(function () {
                    animate(1);
                });

                steps.push($this);
            });

            totalSteps = steps.length;
            currentStep = 1;
        }

        function setContentSize(a) {
            // get view area and set contents to fit it exactly
            viewWidth = $parent.width();
            viewHeight = $parent.height();

            // make sure each step fully fills the view area
            $('[' + a + ']').css({
                'width': viewWidth + 'px',
                'height': viewHeight + 'px'
            });
        }

        function animate(d) {
            currentStep -= d;

            var adjustment = d * viewWidth,
                newPos = $wrapper.css('left');
            newPos = Number(newPos.replace('px', ''));
            newPos += adjustment;
            new TweenLite($wrapper, .5, {'left': newPos + 'px', ease: Quad.easeInOut})

            // add events for additional features
            //var navEvent = new CustomEvent('navEvent', {'detail': currentStep});
            //domParent.dispatchEvent(navEvent);

            // use jQuery for IE 9 and 10 workaround
            //$('body').trigger('navEvent', [currentStep]);
        }

        return {
            init: init
        }
    }();

})();