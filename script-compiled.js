'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  //szablon klasy
  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      running: false,
      savedTimes: []
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: 'reset',
    value: function reset() {
      //metoda resetująca pomiar
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }
  }, {
    key: 'format',
    value: function format(times) {
      //metoda ustawiająca format wyświetlania czasu mm:ss:msms
      return pad0(this.state.times.minutes) + ':' + pad0(this.state.times.seconds) + ':' + pad0(Math.floor(this.state.times.miliseconds));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        //sprawdzamy czy stoper "chodzi"
        this.setState({
          running: true, //jesli nie działa to go włączamy
          watch: setInterval(function () {
            return _this2.step();
          }, 10) //zmienieamy wartość co 10 ms odpalając metodę step, jako pierwszy argument callback (akyualny stan)
        });
      }
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.state.running) return; //sprawdzamy czy stoper "chodzi"
      this.calculate();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      //przelicza milisekundy na sekundy a sekundy na minuty i odpowiednio dodaje/zeruje
      var times = this.state.times;
      times.miliseconds += 1;
      if (times.miliseconds >= 100) {
        times.seconds += 1;
        times.miliseconds = 0;
      }
      if (times.seconds >= 60) {
        times.minutes += 1;
        times.seconds = 0;
      }
      this.setState({ times: times });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.setState({
        running: false
      });
      clearInterval(this.state.watch);
    }
  }, {
    key: 'zero',
    value: function zero() {
      this.state.running = false;
      this.reset();
    }
  }, {
    key: 'saveTime',
    value: function saveTime() {
      var savedTime = this.format(this.state.times);
      if (savedTime !== this.state.savedTimes[this.state.savedTimes.length - 1]) {
        this.setState({
          savedTimes: [].concat(_toConsumableArray(this.state.savedTimes), [savedTime])
        });
      }
      //this.formatTimeTable();
    }
  }, {
    key: 'clearTimeTable',
    value: function clearTimeTable() {
      this.setState({
        savedTimes: []
      });
      this.formatTimeTable();
    }
  }, {
    key: 'formatTimeTable',
    value: function formatTimeTable() {
      var savedItems = [];
      for (var i = 0; i < this.state.savedTimes.length; i++) {
        savedItems.push(React.createElement(
          'li',
          null,
          this.state.savedTimes[i]
        ));
      }
      return savedItems.map(function (savedItems) {
        return React.createElement(
          'li',
          null,
          savedItems
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        { className: 'app' },
        React.createElement(
          'nav',
          { className: 'controls' },
          React.createElement(
            'a',
            { href: "#", className: 'button', id: 'start', onClick: function onClick() {
                return _this3.start();
              } },
            'Start'
          ),
          React.createElement(
            'a',
            { href: "#", className: 'button', id: 'stop', onClick: function onClick() {
                return _this3.stop();
              } },
            'Stop'
          ),
          React.createElement(
            'a',
            { href: "#", className: 'button', id: 'reset', onClick: function onClick() {
                return _this3.reset();
              } },
            'Reset'
          )
        ),
        React.createElement(
          'div',
          { className: 'stopwatch' },
          this.format()
        ),
        React.createElement(
          'nav',
          { className: 'times-controls' },
          React.createElement(
            'a',
            { href: "#", className: 'button', id: 'save', onClick: function onClick() {
                return _this3.saveTime();
              } },
            'Save Time'
          ),
          React.createElement(
            'a',
            { href: "#", className: 'button', id: 'resetTable', onClick: function onClick() {
                return _this3.clearTimeTable();
              } },
            'Clear times'
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'ul',
            { className: 'results' },
            this.formatTimeTable()
          )
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

function pad0(value) {
  //funkcja ustawijąca 0 na początku jeśli pomiar jest jednocyfrowy
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var app = document.getElementById('app');
ReactDOM.render(React.createElement(Stopwatch, null), app);
// const stopwatch = new Stopwatch(//instancja klasy
// document.querySelector('.stopwatch'));

// const results = document.querySelector('.results');

// let startButton = document.getElementById('start'); //metoda dla przycisku start
// startButton.addEventListener('click', () => stopwatch.start());

// let stopButton = document.getElementById('stop');
// stopButton.addEventListener('click', () => stopwatch.stop());

// let resetButton = document.getElementById('reset');
// resetButton.addEventListener('click', () => stopwatch.zero());

// let saveButton = document.getElementById('save');
// saveButton.addEventListener('click', () => stopwatch.saveTime());

// let clearButton = document.getElementById('cleartimes');
// clearButton.addEventListener('click', () => stopwatch.clearTimes());
