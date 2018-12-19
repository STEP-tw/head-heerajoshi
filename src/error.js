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


  module.exports = {errorHandling};