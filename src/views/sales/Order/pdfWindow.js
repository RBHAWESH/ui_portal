import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { pdfStyles } from "./pdfStyle";

export const PdfWindow = ({ children, closePdfWindow }) => {

  const externalWindow = useRef(
    window.open("", "", "width=800,height=600,left=250,top=250")
  );

  const containerEl = document.createElement("div");

  var script = document.createElement('script');
  script.textContent = 'setTimeout( function ( ) { window.print(); }, 1000 );';
  containerEl.appendChild(script);

  useEffect(() => {
    const currentWindow = externalWindow.current;
    return () => currentWindow.close();
  }, []);


  externalWindow.current.document.title = "Order Slip";
  externalWindow.current.document.body.appendChild(containerEl);
  pdfStyles(document, externalWindow.current.document);

  externalWindow.current.addEventListener("beforeunload", () => {
    closePdfWindow();
  });

  return ReactDOM.createPortal(children, containerEl);
};
