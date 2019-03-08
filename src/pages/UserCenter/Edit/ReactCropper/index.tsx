import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react'
import Cropper from 'cropperjs'

export { Cropper }

interface Props {
  style: React.CSSProperties
  src: string
}

const ReactCropper: React.FC<Props> = (props, ref) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const cropper = useRef<Cropper>()

  useEffect(() => {
    if (!imgRef.current) {
      return
    }
    cropper.current = new Cropper(imgRef.current, {
      viewMode: 2,
      zoomable: true,
      background: false,
    })

    return () => {
      cropper.current && cropper.current.destroy()
    }
  }, [])

  useImperativeHandle(ref, () => ({
    cropper: cropper.current,
  }))

  return (
    <div style={props.style}>
      <img ref={imgRef} src={props.src} style={{ opacity: 0 }} />
    </div>
  )
}

export default forwardRef(ReactCropper)
