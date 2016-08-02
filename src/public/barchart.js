angular.module('df.barchart', [])

.factory('Barchart', () => {

  const
    PadLeftPx     = 20,
    PadRightPx    = 20,
    PadTopPx      = 50,

    DefaultConfig = {
      rangeStart           : 0,
      rangeEnd             : 24,
      stepValue            : 1,
      gridWidthPx          : 900,
      rowHeightPx          : 50,
      barThickness         : 0.5, // [0, 1]
      headerFont           : '12px serif',
      barLabelFont         : '12px serif',
      gridLineColor        : '#AEAEAE',
      defaultBarFillColor  : '#FFFFFF',
      barOutlineColor      : undefined,
      defaultBarLabelColor : 'black'
    }, 

    Barchart = {

      _padLeftPx     : PadLeftPx,
      _padRightPx    : PadRightPx,
      _padTopPx      : PadTopPx,

      initBarchart (canvasId, config) {
        const
          canvas = document.getElementById(canvasId);

        if (!canvas) {
          throw new Error(`could not get canvas element for id ${canvasId}`);
        }

        this._canvas = canvas;
        this._ctx    = canvas.getContext('2d');

        config = Object.assign({}, DefaultConfig, config);

        this._rangeStart           = config.rangeStart;
        this._rangeEnd             = config.rangeEnd;
        this._stepValue            = config.stepValue;
        this._gridWidthPx          = config.gridWidthPx;
        this._rowHeightPx          = config.rowHeightPx;
        this._halfRowHeightPx      = this._rowHeightPx / 2;
        this._barThickness         = config.barThickness;
        this._headerFont           = config.headerFont;
        this._barLabelFont         = config.barLabelFont;
        this._gridLineColor        = config.gridLineColor;
        this._defaultBarFillColor  = config.defaultBarFillColor;
        this._barOutlineColor      = config.barOutlineColor;
        this._defaultBarLabelColor = config.defaultBarLabelColor;

        this._xScale = this._gridWidthPx / (this._rangeEnd - this._rangeStart);

        this._barHeightPx = this._rowHeightPx * this._barThickness;
        this._barOffsetPx = this._rowHeightPx * (1 - this._barThickness) / 2;

        this._viewPortLeftPx  = this._padLeftPx;
        this._viewPortRightPx = this._padLeftPx + this._gridWidthPx;

        this._canvasWidthPx = this._padLeftPx + this._gridWidthPx + this._padRightPx;
        this._numColumns    = (this._rangeEnd - this._rangeStart) / this._stepValue;
        this._colWidthPx    = this._gridWidthPx / this._numColumns;
      },

      draw (rows) {
        var
          numRows, canvasHeightPx;

        if (!rows) { return; }

        numRows = rows.length;
        canvasHeightPx = this._rowHeightPx * numRows + this._padTopPx;

        this._resize(canvasHeightPx);
        this._drawGrid(canvasHeightPx);
        this._drawHeader();
        this._drawRows(rows);
      },

      _resize (canvasHeightPx) {
        this._canvas.height       = canvasHeightPx;
        this._canvas.style.height = `${canvasHeightPx}px`;
        this._canvas.width        = this._canvasWidthPx;
        this._canvas.style.width  = `${this._canvasWidthPx}px`;
      },

      // draw the vertical grid lines
      _drawGrid (canvasHeightPx) {
        this._ctx.strokeStyle = this._gridLineColor;

        for (var idx = 0; idx <= this._numColumns; ++idx) { 
          var
            x = this._colWidthPx * idx + this._padLeftPx;

          this._ctx.beginPath();
          this._ctx.moveTo(x, this._rowHeightPx);
          this._ctx.lineTo(x, canvasHeightPx);
          this._ctx.stroke();
          this._ctx.closePath();
        } 
      },

      _drawHeader () {
        this._ctx.font         = this._headerFont;
        this._ctx.textAlign    = 'center';
        this._ctx.textBaseline = 'hanging';

        for (var idx = 0; idx <= this._numColumns; ++idx) {
          this._ctx.fillText(
            `${(this._rangeStart + idx * this._stepValue)}`, // header text
            this._colWidthPx * idx + this._padLeftPx,
            this._rowHeightPx / 2
          ); 
        }
      },

      _drawRows (rows) {
        rows.forEach((row, rowIndex) => {
          const
            visibleBars = row.bars.filter(bar => 
              bar.start < this._rangeEnd && bar.end > this._rangeStart
            );

          this._ctx.fillStyle = row.barFillColor || this._defaultBarFillColor;
          this._ctx.strokeStyle = this._barOutlineColor || this._ctx.fillStyle;

          visibleBars.forEach(bar => {
            this._drawBar(bar, rowIndex, row.barLabelColor);
          });
        });
      },

      _drawBar (bar, rowIndex, barLabelColor) {
        var
          x = this._toPixels(bar.start - this._rangeStart) + this._viewPortLeftPx,
          rowTop = this._padTopPx + rowIndex * this._rowHeightPx,
          y = rowTop + this._barOffsetPx,

        width = this._toPixels(bar.end - bar.start);
    
        if (x < this._viewPortLeftPx) {
          // cut off on the left
          width -= (this._viewPortLeftPx - x);
          x = this._viewPortLeftPx;
        }

        if ((x + width) > this._viewPortRightPx) {
          // cut off on the right
          width -= (x + width) - this._viewPortRightPx; 
        }

        // draw the bar
        this._ctx.fillRect(x, y, width, this._barHeightPx);
        this._ctx.strokeRect(x, y, width, this._barHeightPx);

        // label
        if (bar.label) {

          this._drawBarLabel(
            bar.label,
            barLabelColor,
            x + width / 2,
            rowTop + this._halfRowHeightPx,
            width);
        }
      },

      _toPixels (xPos) {
        return xPos * this._xScale;
      },

      _drawBarLabel (label, color, x, y, maxWidth) {
        const
          currFillStyle = this._ctx.fillStyle;

        this._ctx.fillStyle    = color || this._defaultBarLabelColor;
        this._ctx.font         = this._barLabelFont;
        this._ctx.textAlign    = 'center';
        this._ctx.textBaseline = 'middle';

        this._ctx.fillText(label, x, y, maxWidth); 

        // restore the fillStyle
        this._ctx.fillStyle = currFillStyle;
      }
    }; 

  return {

    Barchart : Barchart,

    create : (canvasId, config) => {
      const obj = Object.create(Barchart);
      obj.initBarchart(canvasId, config); 
      return obj;
    }
  };
})

;


