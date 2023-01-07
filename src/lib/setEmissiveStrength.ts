import { Document } from '@gltf-transform/core'
import { MaterialsEmissiveStrength, TextureWebP } from '@gltf-transform/extensions'
import { EMISSIVE_STRENGTH } from '../constants'

export function setEmissiveStrength (doc: Document, strength: number = EMISSIVE_STRENGTH): void {
  const emissiveStrengthExtension = doc.createExtension(MaterialsEmissiveStrength)
  const emissiveStrength = emissiveStrengthExtension.createEmissiveStrength().setEmissiveStrength(strength)
  doc.createExtension(TextureWebP).setRequired(true)
  doc.getRoot().listMaterials().forEach((material) => {
    material.setExtension('KHR_materials_emissive_strength', emissiveStrength)
  })
}
