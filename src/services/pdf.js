const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const COMMON = require("../constants/common");

function generateCertificate(rewardType, data) {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    doc = generateCertificateBorder(doc);
    doc = addLogo(rewardType, doc);
    doc =
      rewardType === COMMON.EMP_OF_MONTH
        ? addRewardTitle(rewardType, doc, data?.month?.toUpperCase())
        : addRewardTitle(rewardType, doc);

    doc = addAppreciationContent(doc, data?.name?.toUpperCase());
    doc = addRewardMessage(rewardType, doc);
    doc = addSignatures(doc);

    let outputPath = path.resolve(__dirname, `../utils/assets/${rewardType}.pdf`);
    let writeStream = fs.createWriteStream(outputPath);
    writeStream.on("finish", () => {
      resolve();
    });
    writeStream.on("error", (err) => {
      reject(err);
    });

    doc.pipe(writeStream);
    doc.end();
  });
}

function generateCertificateBorder(doc) {
  const distanceMargin = 18;
  doc
    .fillAndStroke("#0e8cc3")
    .lineWidth(2.5)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2
    )
    .stroke();
  doc
    .fillAndStroke("#0e8cc3")
    .lineWidth(0.5)
    .lineJoin("round")
    .rect(
      25,
      25,
      doc.page.width - distanceMargin * 2 - 15,
      doc.page.height - distanceMargin * 2 - 14
    )
    .stroke();

  return doc;
}

function addLogo(rewardType, doc) {
  const maxWidth = 160;
  const maxHeight = 100;
  let imagePath;
  if (rewardType === COMMON.EMP_OF_DAY) {
    imagePath = path.resolve(
      __dirname,
      "../utils/assets/images/winner_logo.png"
    );
    doc.image(imagePath, 18, 18, {
      fit: [maxWidth + 20, maxHeight + 20],
      align: "left",
    });
  }
  if (rewardType === COMMON.EMP_OF_WEEK) {
    imagePath = path.resolve(
      __dirname,
      "../utils/assets/images/winner_week.png"
    );
    doc.image(imagePath, 18, 18, {
      fit: [maxWidth + 20, maxHeight + 20],
      align: "left",
    });
  }
  if (rewardType === COMMON.EMP_OF_MONTH) {
    imagePath = path.resolve(
      __dirname,
      "../utils/assets/images/winner_month.png"
    );
    doc.image(imagePath, 18, 18, {
      fit: [maxWidth + 20, maxHeight + 20],
      align: "left",
    });
  }

  imagePath = path.resolve(
    __dirname,
    "../utils/assets/images/company_logo.jpg"
  );
  doc.image(imagePath, doc.page.width / 2 - maxWidth / 2, 50, {
    fit: [maxWidth + 20, maxHeight + 20],
    align: "center",
  });

  doc = jumpLine(doc, 7);

  return doc;
}

function addRewardTitle(rewardType, doc, month) {
  if (rewardType === COMMON.EMP_OF_DAY) {
    doc
      .font("Helvetica-Bold")
      .fontSize(25)
      .fill("#021c27")
      .text("EMPLOYEE OF THE DAY", {
        align: "center",
      });
  }
  if (rewardType === COMMON.EMP_OF_WEEK) {
    doc
      .font("Helvetica-Bold")
      .fontSize(25)
      .fill("#021c27")
      .text("EMPLOYEE OF THE WEEK", {
        align: "center",
      });
  }
  if (rewardType === COMMON.EMP_OF_MONTH) {
    doc.font("Helvetica-Bold")
      .fontSize(25)
      .fill("#021c27")
      .text(`EMPLOYEE OF THE ${month} MONTH`, {
        align: "center",
      });
  }

  doc = jumpLine(doc, 1);

  return doc;
}

function addAppreciationContent(doc, empName = "") {
  let fontPath = path.resolve(
    __dirname,
    "../utils/assets/fonts/NotoSansJP-Light.otf"
  );
  doc
    .font(fontPath)
    .fontSize(10)
    .fill("#021c27")
    .text("THIS IS PROUDLY PRESENTED TO", {
      align: "center",
    });

  doc = jumpLine(doc, 2);

  fontPath = path.resolve(
    __dirname,
    "../utils/assets/fonts/NotoSansJP-Bold.otf"
  );
  doc.font(fontPath).fontSize(24).fill("#021c27").text(`${empName}`, {
    align: "center",
  });

  doc = jumpLine(doc, 1);

  return doc;
}

function addRewardMessage(rewardType, doc) {
  let fontPath = path.resolve(
    __dirname,
    "../utils/assets/fonts/NotoSansJP-Light.otf"
  );
  doc
    .font(fontPath)
    .fontSize(10)
    .fill("#021c27")
    .text(`${COMMON.CERT_MESSAGE[rewardType]}`, {
      align: "center",
    });

  doc = jumpLine(doc, 15);
  return doc;
}

function addSignatures(doc) {
  doc.lineWidth(1);

  // Signatures
  const lineSize = 174;
  const signatureHeight = 390;

  doc.fillAndStroke("#021c27");
  doc.strokeOpacity(0.2);

  const startLine1 = 128;
  const endLine1 = 128 + lineSize;
  doc
    .moveTo(startLine1, signatureHeight)
    .lineTo(endLine1, signatureHeight)
    .stroke();

  const startLine2 = endLine1 + 32;
  const endLine2 = startLine2 + lineSize;
  doc
    .moveTo(startLine2, signatureHeight)
    .lineTo(endLine2, signatureHeight)
    .stroke();

  const startLine3 = endLine2 + 32;
  const endLine3 = startLine3 + lineSize;
  doc
    .moveTo(startLine3, signatureHeight)
    .lineTo(endLine3, signatureHeight)
    .stroke();

  let fontPath = path.resolve(
    __dirname,
    "../utils/assets/fonts/NotoSansJP-Bold.otf"
  );
  doc
    .font(fontPath)
    .fontSize(10)
    .fill("#021c27")
    .text("John Doe", startLine1, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });
  fontPath = path.resolve(
    __dirname,
    "../utils/assets/fonts/NotoSansJP-Light.otf"
  );
  doc
    .font(fontPath)
    .fontSize(10)
    .fill("#021c27")
    .text("CEO", startLine1, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  fontPath = path.resolve(
    __dirname,
    "../utils/assets/fonts/NotoSansJP-Bold.otf"
  );
  doc
    .font(fontPath)
    .fontSize(10)
    .fill("#021c27")
    .text("Date", startLine2, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });
  const today = new Date();
  const dateStr = `${today.toDateString()} ${today.getFullYear()}`;

  fontPath = path.resolve(
    __dirname,
    "../utils/assets/fonts/NotoSansJP-Light.otf"
  );
  doc
    .font(fontPath)
    .fontSize(10)
    .fill("#021c27")
    .text(dateStr, startLine2, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  fontPath = path.resolve(
    __dirname,
    "../utils/assets/fonts/NotoSansJP-Bold.otf"
  );
  doc
    .font(fontPath)
    .fontSize(10)
    .fill("#021c27")
    .text("Jane Doe", startLine3, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  fontPath = path.resolve(
    __dirname,
    "../utils/assets/fonts/NotoSansJP-Light.otf"
  );
  doc
    .font(fontPath)
    .fontSize(10)
    .fill("#021c27")
    .text("Director", startLine3, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc = jumpLine(doc, 4);

  return doc;
}

function jumpLine(doc, lines) {
  for (let index = 0; index < lines; index++) {
    doc.moveDown();
  }

  return doc;
}

module.exports = {
  generateCertificate,
};
