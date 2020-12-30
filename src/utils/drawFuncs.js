import { heatMetersTypeArr } from "./tduModelStorage";

const colors = {
  brass1: '#A58540',
  brass2: '#80724E',
  brass3: '#6F6342',
  brass4: '#605539',
  brass5: '#8b7139',
  brass6: '#91763b',
  brassNickel1: '#6b6b6b',
  brassNickel2: '#535652',
  lightRed: '#c83c37',
  mildBlack: '#25252D',
  mildBlue: '#3E65BC',
  mildGray: '#c7c7c7',
  mildRed: '#b43631',
  mildWhite: '#D7DADA',
}


export const drawCollChunkEl = (ctx, topOffset, w) => {
  ctx.fillStyle = colors.mildBlack;
  ctx.fillRect(0, topOffset, w, 50);
}


export const drawApt = (ctx, aptTypeDn) => {
  ctx.canvas.width  = 87;
  ctx.canvas.height = 144;

  ctx.fillStyle = colors.brass4;
  ctx.fillRect(9, 34, 69, 9); // neck from the corpus to the regulator

  ctx.fillStyle = colors.brass3;
  ctx.fillRect(12, 2, 63, 32); // corpus pipe

  ctx.fillStyle = colors.brass2;
  ctx.fillRect(0, 0, 12, 36); // left thread
  ctx.fillRect(75, 0, 12, 36); // right thread
  ctx.fillRect(2, 43, 83, 12); // regulator, wide
  ctx.fillRect(21, 55, 45, 13); // regulator, narrow part

  ctx.fillStyle = colors.mildBlue; // regulator, handle
  ctx.fillRect(25, 68, 37, 24);
  ctx.fillRect(23, 119, 40, 25);

  ctx.fillStyle = colors.mildBlack;
  ctx.fillRect(23, 71, 41, 16);
  ctx.fillRect(30, 92, 27, 27);

  ctx.fillStyle = 'black';
  ctx.fillText(aptTypeDn, 0, 10);
}


export const drawPartner = (ctx, partnerTypeDn) => {
  ctx.canvas.width  = 87;
  ctx.canvas.height = 115;

  ctx.fillStyle = colors.brass2;
  ctx.fillRect(0, 0, 12, 36); // left thread
  ctx.fillRect(75, 0, 12, 36); // right thread
  ctx.fillRect(24, 34, 39, 8); // neck to handle (part 1 for asvbd)
  ctx.fillStyle = colors.brass3;
  ctx.fillRect(12, 2, 63, 32); // corpus pipe

  if (partnerTypeDn.includes('ASVBD')) {

    ctx.fillStyle = colors.brassNickel1;
    ctx.fillRect(26, 42, 35, 20); // neck to handle part 2

    ctx.fillStyle = colors.brass5; // nipple
    ctx.beginPath();
    ctx.moveTo(23, 34);
    ctx.lineTo(36, 34);
    ctx.lineTo(32, 48);
    ctx.lineTo(14, 66);
    ctx.lineTo(3, 54);
    ctx.fill();

    ctx.fillStyle = colors.mildRed; // nipple
    ctx.beginPath();
    ctx.moveTo(5, 48);
    ctx.lineTo(8, 45);
    ctx.lineTo(23, 60);
    ctx.lineTo(20, 63);
    ctx.fill();

    ctx.fillStyle = colors.mildBlack;
    ctx.beginPath();
    ctx.moveTo(22, 62);
    ctx.lineTo(65, 62);
    ctx.lineTo(65, 70);
    ctx.lineTo(71, 70);
    ctx.lineTo(71, 85);
    ctx.lineTo(81, 95);
    ctx.lineTo(81, 115);
    ctx.lineTo(6, 115);
    ctx.lineTo(6, 73);
    ctx.lineTo(22, 70);
    ctx.fill();

    ctx.fillStyle = colors.mildWhite;
    ctx.fillRect(28, 95, 16, 8);

  } else {

    ctx.fillStyle = colors.brass1;
    ctx.beginPath();
    ctx.arc(25, 14, 4, 0, Math.PI*2); // left nipple external circle
    ctx.fill();
    ctx.beginPath();
    ctx.arc(62, 14, 4, 0, Math.PI*2); // right nipple external circle
    ctx.fill();
    ctx.fillStyle = colors.brass5;
    ctx.beginPath();
    ctx.arc(43, 24, 6, 0, Math.PI*2); //
    ctx.fill();
    ctx.fillStyle = colors.mildBlack;
    ctx.beginPath();
    ctx.arc(25, 14, 2, 0, Math.PI*2); // left nipple hole
    ctx.fill();
    ctx.beginPath();
    ctx.arc(62, 14, 2, 0, Math.PI*2); // right nipple hole
    ctx.fill();
    ctx.beginPath();
    ctx.arc(43, 24, 4, 0, Math.PI*2); // impulse tube hole
    ctx.fill();

    ctx.fillStyle = colors.mildRed; // handle
    ctx.fillRect(25, 57, 37, 24);
    
    if (partnerTypeDn.includes('CNT')) {
      ctx.fillStyle = colors.mildBlack; // tuning scale
      ctx.fillRect(30, 42, 27, 15);
    } else {
      ctx.fillStyle = colors.brass6; // brass narrow neck istead of tuning scale
      ctx.fillRect(33, 42, 21, 15);
    }

  }

  ctx.fillStyle = 'black';
  ctx.fillText(partnerTypeDn, 0, 10);

}


export const drawTailVent = (ctx, airVent, isDrainageBranch) => {
  ctx.canvas.width  = 34;
  ctx.canvas.height = 458;

  const drawHalf = (offset) => {
    
    switch(airVent) {
      case 'maevsky15': {
        ctx.fillStyle = '#cecece';
        ctx.fillRect(7, offset+36, 20, 14);
        break;
      }
      case 'airvent15': {
        ctx.fillStyle = colors.brass2;
        ctx.fillRect(0, offset+15, 34, 7);
        ctx.fillRect(4, offset+22, 26, 25);
        ctx.fillRect(9, offset+47, 16, 3);
        ctx.fillRect(19, offset+7, 8, 8);
        break;
      }
    }

    ctx.fillStyle = colors.mildBlack; // appendix for airVent

    ctx.fillRect(4, offset+50, 26, 25);

    if (isDrainageBranch) {
      ctx.fillRect(5, offset+125, 24, 14); // coll appendix to branch

      ctx.fillStyle = colors.brassNickel2;
      ctx.fillRect(3, offset+139, 28, 10); // top fiting
      ctx.fillRect(3, offset+194, 28, 10); // bottom fiting
      ctx.fillStyle = colors.brassNickel1;
      ctx.fillRect(5, offset+149, 24, 45); // corpus pipe
      ctx.fillStyle = colors.mildRed;
      ctx.fillRect(11, offset+165, 12, 45); // handle
      ctx.fillStyle = colors.brassNickel2;
      ctx.beginPath();
      ctx.arc(17, offset+171, 5, 0, Math.PI*2); // external handle nut circle
      ctx.fill();
      ctx.fillStyle = colors.mildBlack;
      ctx.beginPath();
      ctx.arc(17, offset+171, 3, 0, Math.PI*2); // internal handle nut circle
      ctx.fill();
    }

    drawCollChunkEl(ctx, offset+75, 125);
  }

  drawHalf(0);
  drawHalf(248)
}


export const drawBrackets = (ctx, isBrackets, isTail) => {

  isTail ? ctx.canvas.width = 33 : ctx.canvas.width = 22;
  ctx.canvas.height = 450;

  const drawHalf = (offset) => {

    drawCollChunkEl(ctx, 2+offset, 22);

    if (isBrackets) {
      ctx.fillStyle = '#c1c1c1';
      ctx.fillRect(4, 0+offset, 14, 54);
      ctx.fillRect(6, 54+offset, 10, 12);
      ctx.fillRect(2, 66+offset, 18, 50);
    }

    if (isTail) {
      ctx.fillStyle = colors.mildBlack;
      ctx.beginPath();
      ctx.moveTo(22, 2+offset);
      ctx.bezierCurveTo(37, 7+offset, 37, 47+offset, 22, 52+offset);
      ctx.fill();
    }
  }
  drawHalf(73);
  drawHalf(321);
}


export const drawCollChunkAndBrassInsert = (ctx) => {
  ctx.canvas.width  = 86;
  ctx.canvas.height = 95;

  drawCollChunkEl(ctx, 31, 86);
  ctx.fillRect(31, 81, 24, 14);
  
  ctx.fillStyle = 'darkgreen'; // brass insert
  ctx.beginPath();
  ctx.moveTo(30, 31);
  ctx.lineTo(30, 22);
  ctx.lineTo(33, 22);
  ctx.lineTo(34, 0);
  ctx.lineTo(51, 0);
  ctx.lineTo(52, 22);
  ctx.lineTo(56, 22);
  ctx.lineTo(56, 31);
  ctx.fill();
}


export const drawBranchBalans = (ctx, branchBalansTypeDn) => {

  ctx.canvas.width  = 86;
  ctx.canvas.height = 65;
  
  ctx.fillStyle = colors.brass5;
  ctx.fillRect(29, 0, 28, 10); // top fiting
  ctx.fillRect(29, 55, 28, 10); // bottom fiting
  ctx.fillStyle = colors.brass6;
  ctx.fillRect(31, 10, 24, 45); // corpus pipe

  if (branchBalansTypeDn === 'MNT15') {
    ctx.fillStyle = colors.brass6;
    ctx.fillRect(19, 13, 12, 6); // nipple
    ctx.fillRect(14, 25, 17, 21); // drenage pipe
    ctx.fillRect(8, 23, 7, 25); // drenage cap
    ctx.fillStyle = colors.mildBlack; // rubber
    ctx.fillRect(15, 24, 4, 23);
    ctx.fillRect(5, 34, 3, 3);
    ctx.fillStyle = colors.mildRed; // handle externnal circle
    ctx.beginPath();
    ctx.arc(43, 33, 14, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = colors.lightRed; // handle internal circle
    ctx.beginPath();
    ctx.arc(43, 33, 11, 0, Math.PI*2);
    ctx.fill();
  } else if (branchBalansTypeDn === 'MSVB15') {
    ctx.fillStyle = colors.mildBlack;
    ctx.beginPath();
    ctx.arc(43, 33, 17, 0, Math.PI*2); // handle, the biggest circle
    ctx.arc(28, 26, 9, 0, Math.PI*2); // handle, the left circle
    ctx.arc(58, 26, 9, 0, Math.PI*2); // handle, the right circle
    ctx.fill();
    ctx.beginPath();
    ctx.arc(43, 48, 12, 0, Math.PI*2); // handle, the bottom circle
    ctx.fill();
    ctx.fillStyle = '#f1f1f1'; // handle, internal white circle
    ctx.beginPath();
    ctx.arc(43, 33, 13, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = colors.mildBlack; // handle, internal black circle
    ctx.beginPath();
    ctx.arc(43, 33, 8, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = colors.mildBlue;
    ctx.beginPath();
    ctx.arc(37, 12, 5, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = colors.mildRed;
    ctx.beginPath();
    ctx.arc(49, 12, 5, 0, Math.PI*2);
    ctx.fill();
  }
}


export const drawHeatMeter = (ctx, heatMetersType) => {

  ctx.canvas.width  = 86;
  ctx.canvas.height = 114;

  ctx.fillStyle = colors.brass1; // heatMeter finings
  ctx.fillRect(28, 0, 30, 15);
  ctx.fillRect(28, 99, 30, 15);

  if (heatMetersType === heatMetersTypeArr[0]) {
    ctx.fillStyle = '#332E29';
    ctx.fillRect(32, 15, 22, 84);
    ctx.fillStyle = '#A25C09';
    ctx.fillRect(31, 26, 24, 62);
  } else {
    ctx.fillStyle = colors.mildWhite; // heatMeter corpus
    ctx.fillRect(8, 7, 70, 100);
    ctx.fillStyle = colors.mildGray; // heatMeter internal rect
    ctx.fillRect(8, 18, 70, 80);
    ctx.fillStyle = '#738076';  // heatMeter long display chunk
    ctx.fillRect(30, 18, 27, 64);
    ctx.fillStyle = '#53575A'; // heatMeter short display chunk
    ctx.fillRect(30, 82, 27, 16);
    ctx.fillStyle = 'black';
    ctx.fillText(heatMetersType, 8, 16);
  }
}


export const drawControlBtn = (ctx, act) => {

  switch (act) {

    case 'removeBranch':
      ctx.canvas.width  = 36;
      ctx.canvas.height = 36;
      ctx.fillStyle = colors.mildBlack;
      ctx.fillRect(0, 13, 36, 10);
      break;

    case 'addBranch':
      ctx.canvas.width  = 36;
      ctx.canvas.height = 36;
      ctx.fillStyle = colors.mildBlack;
      ctx.fillRect(0, 13, 36, 10);
      ctx.fillRect(13, 0, 10, 36);
      break;

    case 'switchSide':
      ctx.canvas.width  = 42;
      ctx.canvas.height = 36;
      ctx.fillStyle = colors.mildBlack;
      ctx.fillRect(12, 13, 18, 10);
      ctx.beginPath(); // left arrow
      ctx.moveTo(0, 18);
      ctx.lineTo(12, 6);
      ctx.lineTo(12, 30);
      ctx.fill();
      ctx.beginPath(); // rigth arrow
      ctx.moveTo(42, 18);
      ctx.lineTo(30, 6);
      ctx.lineTo(30, 30);
      ctx.fill();
      break;

    case 'switchHeatMetersLoc':
      ctx.canvas.width  = 60;
      ctx.canvas.height = 36;
      ctx.fillStyle = colors.brass1; // heatMeter finings
      ctx.fillRect(0, 13, 60, 10);
      ctx.fillStyle = colors.mildWhite; // heatMeter corpus
      ctx.fillRect(4, 0, 52, 36);
      ctx.fillStyle = '#c7c7c7'; // heatMeter internal rect
      ctx.fillRect(9, 0, 42, 36);

      ctx.fillStyle = '#738076';  // heatMeter long display chunk
      ctx.fillRect(9, 11, 32, 14);

      ctx.fillStyle = '#53575A'; // heatMeter short display chunk
      ctx.fillRect(41, 11, 10, 14);
      break;

    case 'switchIsAddInputFilter':
      ctx.canvas.width  = 60;
      ctx.canvas.height = 36;
      ctx.fillStyle = colors.mildBlack;
      ctx.font = "bold 34pt Calibri";
      ctx.fillText('FR', 0, 32);
      break;

    case 'switchIsPartner':
      ctx.canvas.width  = 44;
      ctx.canvas.height = 36;

      ctx.fillStyle = colors.brass2;
      ctx.fillRect(0, 0, 6, 16); // left thread
      ctx.fillRect(38, 0, 6, 16); // right thread
      ctx.fillRect(13, 15, 18, 4); // neck to handle (part 1 for asvbd)
      ctx.fillStyle = colors.brass3;
      ctx.fillRect(6, 1, 32, 14); // corpus pipe

      ctx.fillStyle = colors.mildBlack; // tuning scale
      ctx.fillRect(15, 19, 14, 6);

      ctx.fillStyle = colors.mildRed; // handle
      ctx.fillRect(13, 25, 18, 11);
      break;

    case 'switchIsBox':
      ctx.canvas.width  = 44;
      ctx.canvas.height = 36;

      ctx.fillStyle = colors.mildGray;
      ctx.fillRect(0, 0, 4, 36);
      ctx.fillRect(40, 0, 4, 36);
      ctx.fillRect(4, 0, 36, 4);
      ctx.fillRect(4, 32, 36, 4);
      ctx.fillStyle = colors.mildWhite;
      ctx.fillRect(4, 4, 36, 28);
      break;

    case 'switchIsDrainageBranch':
      ctx.canvas.width  = 65;
      ctx.canvas.height = 36;
      ctx.fillStyle = colors.mildBlack;
      ctx.font = "bold 34pt Calibri";
      ctx.fillText('DR', 0, 32);
      break;

    default:
      ctx.fillRect(0, 0, 10, 10);
  }

}


export const drawFilter = (ctx, bvAndFilterDn) => {
  ctx.canvas.width  = 84;
  ctx.canvas.height = 72;
  
  ctx.fillStyle = colors.brass3; // filter corpus
  ctx.fillRect(0, 0, 19, 36); // thread
  ctx.fillRect(65, 0, 19, 36); // thread
  ctx.fillRect(19, 4, 26, 28); // corpus pipe
  ctx.fillRect(45, 2, 20, 32); // ...
  
  ctx.fillStyle = colors.brass2; // filter filtering part
  ctx.beginPath();
  ctx.moveTo(19, 32);
  ctx.lineTo(38, 18);
  ctx.lineTo(65, 34);
  ctx.lineTo(75, 36);
  ctx.lineTo(74, 43);
  ctx.lineTo(78, 48);
  ctx.lineTo(58, 68);
  ctx.lineTo(54, 64);
  ctx.lineTo(51, 67);
  ctx.fill();
  
  ctx.beginPath(); // drenage valve
  ctx.fillStyle = colors.mildBlack;
  ctx.moveTo(74, 53);
  ctx.lineTo(84, 64);
  ctx.lineTo(76, 72);
  ctx.lineTo(64, 63);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.fillText(bvAndFilterDn, 0, 10);
}


export const drawUnionNutValve = (ctx, bvAndFilterDn) => {
  ctx.canvas.width  = 75;
  ctx.canvas.height = 58;

  ctx.fillStyle = colors.brassNickel1; // appendix for handle and part before nut
  ctx.fillRect(20, 14, 16, 6);
  ctx.fillRect(43, 22, 7, 32);
  ctx.fillStyle = colors.mildRed; // handle
  ctx.fillRect(5, 0, 48, 14);
  ctx.fillStyle = colors.brassNickel2; // corpus
  ctx.fillRect(0, 20, 43, 36);
  ctx.fillRect(50, 18, 16, 40);
  ctx.fillStyle = colors.brass5; // thread
  ctx.fillRect(66, 24, 9, 28);

  ctx.fillStyle = 'black';
  ctx.fillText(bvAndFilterDn, 0, 10);
}