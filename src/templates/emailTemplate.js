exports.emailTemplate = (subject, body) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${subject}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333333;
        text-align: center;
      }
      p {
        color: #666666;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${subject}</h1>
      ${body}
    </div>
  </body>
</html>
`;