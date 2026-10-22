import Color from "color";
import { PanelSectionRow } from "@decky/ui";
import { useRef, useState } from "react";
import { SlowSliderField } from "./SlowSliderField";

interface ColorPickSliderProps {
  value: string;
  resetValue?: string;
  OnConfirm: (text: string) => void;
}

export function ColorPickSlider({
  value,
  resetValue,
  OnConfirm,
}: ColorPickSliderProps) {
  const [HSLValue, setHSLValue] = useState(Color(`#${value}`).hsl().array());
  const resetHSLValue = useRef(Color(`#${resetValue ?? value}`).hsl().array());
  const hexColor = Color.hsl(`hsl(${HSLValue[0]}, ${HSLValue[1]}%, ${HSLValue[2]}%)`).rgb().hex();

  const confirmColor = (hue: number, saturation: number, lightness: number) => {
    OnConfirm(Color.hsl(`hsl(${hue}, ${saturation}%, ${lightness}%)`).rgb().hex().replace("#", ""));
  };

  return (
    <>
      <div className="mango-peel-color-picker-hue">
        <PanelSectionRow>
          <SlowSliderField
            min={0}
            max={359}
            step={1}
            label={
              <div style={{ display: "flex", alignItems: "center", fontSize: 11 }}>
                <span>{hexColor}</span>
                <div
                  style={{
                    marginLeft: "auto",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: hexColor,
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </div>
              </div>
            }
            layout="below"
            bottomSeparator="none"
            onChange={(hue) => {
              setHSLValue(Color.hsl(`hsl(${hue}, ${HSLValue[1]}%, ${HSLValue[2]}%)`).array());
            }}
            onChangeEnd={(hue) => {
              confirmColor(hue, HSLValue[1], HSLValue[2]);
            }}
            value={HSLValue[0]}
            resetValue={resetHSLValue.current[0]}
          />
        </PanelSectionRow>
      </div>
      <div className="mango-peel-color-picker-saturation">
        <PanelSectionRow>
          <SlowSliderField
            min={0}
            max={100}
            step={1}
            showValue={false}
            layout="below"
            bottomSeparator="none"
            onChange={(saturation) => {
              setHSLValue(Color.hsl(`hsl(${HSLValue[0]}, ${saturation}%, ${HSLValue[2]}%)`).array());
            }}
            onChangeEnd={(saturation) => {
              confirmColor(HSLValue[0], saturation, HSLValue[2]);
            }}
            value={HSLValue[1]}
            resetValue={resetHSLValue.current[1]}
          />
        </PanelSectionRow>
      </div>
      <div className="mango-peel-color-picker-lightness">
        <PanelSectionRow>
          <SlowSliderField
            min={0}
            max={100}
            step={1}
            showValue={false}
            layout="below"
            bottomSeparator="none"
            onChange={(lightness) => {
              setHSLValue(Color.hsl(`hsl(${HSLValue[0]}, ${HSLValue[1]}%, ${lightness}%)`).array());
            }}
            onChangeEnd={(lightness) => {
              confirmColor(HSLValue[0], HSLValue[1], lightness);
            }}
            value={HSLValue[2]}
            resetValue={resetHSLValue.current[2]}
          />
        </PanelSectionRow>
      </div>
      <style>
        {`
          .mango-peel-color-picker-hue .gamepadslider_SliderTrack_Mq25N {
            background: linear-gradient(
              to right,
              hsl(0, ${HSLValue[1]}%, ${HSLValue[2]}%),
              hsl(60, ${HSLValue[1]}%, ${HSLValue[2]}%),
              hsl(120, ${HSLValue[1]}%, ${HSLValue[2]}%),
              hsl(180, ${HSLValue[1]}%, ${HSLValue[2]}%),
              hsl(240, ${HSLValue[1]}%, ${HSLValue[2]}%),
              hsl(300, ${HSLValue[1]}%, ${HSLValue[2]}%),
              hsl(360, ${HSLValue[1]}%, ${HSLValue[2]}%)
            ) !important;
            --left-track-color: #0000 !important;
            --colored-toggles-main-color: #0000 !important;
          }

          .mango-peel-color-picker-saturation .gamepadslider_SliderTrack_Mq25N {
            background: linear-gradient(
              to right,
              hsl(${HSLValue[0]}, 0%, ${HSLValue[2]}%),
              hsl(${HSLValue[0]}, 20%, ${HSLValue[2]}%),
              hsl(${HSLValue[0]}, 40%, ${HSLValue[2]}%),
              hsl(${HSLValue[0]}, 60%, ${HSLValue[2]}%),
              hsl(${HSLValue[0]}, 80%, ${HSLValue[2]}%),
              hsl(${HSLValue[0]}, 100%, ${HSLValue[2]}%)
            ) !important;
            --left-track-color: #0000 !important;
            --colored-toggles-main-color: #0000 !important;
          }

          .mango-peel-color-picker-lightness .gamepadslider_SliderTrack_Mq25N {
            background: linear-gradient(
              to right,
              hsl(${HSLValue[0]}, ${HSLValue[1]}%, 0%),
              hsl(${HSLValue[0]}, ${HSLValue[1]}%, 20%),
              hsl(${HSLValue[0]}, ${HSLValue[1]}%, 40%),
              hsl(${HSLValue[0]}, ${HSLValue[1]}%, 60%),
              hsl(${HSLValue[0]}, ${HSLValue[1]}%, 80%),
              hsl(${HSLValue[0]}, ${HSLValue[1]}%, 100%)
            ) !important;
            --left-track-color: #0000 !important;
            --colored-toggles-main-color: #0000 !important;
          }
        `}
      </style>
    </>
  );
}
