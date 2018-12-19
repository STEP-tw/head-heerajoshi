const errorHandling = function({ option, count }) {
    let type = { n: "line", c: "byte" };
    if (option != "n" && option != "c") {
      return (
        "head: illegal option -- " +
        option +
        "\n" +
        "usage: head [-n lines | -c bytes] [file ...]"
      );
    }
    if (isNaN(count) || count < 1) {
      return "head: illegal " + type[option] + " count -- " + count;
    }
  };


  const errorHandlingTail = function({ option, count }) {
    if (option != "n" && option != "c") {
      return (
        "tail: illegal option -- " +
        option +
        "\n" +
        "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
      );
    }
    if (isNaN(count - 0)) {
      return "tail: illegal offset -- " + count;
    }
  };
  
  module.exports = {errorHandling, errorHandlingTail};