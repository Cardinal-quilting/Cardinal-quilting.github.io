const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" type="text/css" href="styles.css">

  <div class="header">
    <img src="figures/CardinalQuiltsLogo.png" align="left">
    <img src="figures/CardinalQuiltsNameLogo.png" align="top" style="padding: 0.3% 0% 0% 0%">
  </div>
  <div class="buttons">
  <a class="page-link" href="index.html"><button class="button">Home</button></a>
  <a class="page-link" href="paper-piecing.html"><button class="button">Paper piecing</button></a>
  </div>
`;

document.body.prepend(template.content);
