using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UMA;

public class HumanoidMaleDnaConverterBehaviour : HumanoidDnaConverterBehaviour
{
    public HumanoidMaleDnaConverterBehaviour()
    {
        this.ApplyDnaAction = UpdateUMAMaleDNABones;
        this.DNAType = typeof(UMADnaHumanoid);
    }
    public static void UpdateUMAMaleDNABones(UMAData umaData, UMASkeleton skeleton)
    {
        var umaDna = umaData.umaRecipe.GetDna<UMADnaHumanoid>();
     
        skeleton.SetPositionRelative(shullAdjustHash,
                          new Vector3(
                              Mathf.Clamp((umaDna.shullPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                              Mathf.Clamp(0, -1, 1),
                               Mathf.Clamp((umaDna.shullPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                              );
        skeleton.SetRotation(shullAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.shullRotationx - 0.5f) * 20, 0, (umaDna.shullRotationz - 0.5f) * 20)));
        skeleton.SetScale(shullAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.shullSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.shullSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.shullSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(cheek_lAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.cheek_lPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.cheek_lPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(cheek_lAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.cheek_lRotationx - 0.5f) * 20, 0, (umaDna.cheek_lRotationz - 0.5f) * 20)));
        skeleton.SetScale(cheek_lAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.cheek_lSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.cheek_lSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.cheek_lSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(cheek_rAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.cheek_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.cheek_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(cheek_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.cheek_rRotationx - 0.5f) * 20, 0, (umaDna.cheek_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(cheek_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.cheek_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.cheek_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.cheek_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(cheek_02_lAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.cheek_02_lPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.cheek_02_lPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(cheek_02_lAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.cheek_02_lRotationx - 0.5f) * 20, 0, (umaDna.cheek_02_lRotationz - 0.5f) * 20)));
        skeleton.SetScale(cheek_02_lAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.cheek_02_lSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.cheek_02_lSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.cheek_02_lSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(chin_02_rAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.chin_02_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.chin_02_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(chin_02_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.chin_02_rRotationx - 0.5f) * 20, 0, (umaDna.chin_02_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(chin_02_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.chin_02_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.chin_02_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.chin_02_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(chin_03_rAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.chin_02_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.chin_03_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(chin_03_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.chin_03_rRotationx - 0.5f) * 20, 0, (umaDna.chin_03_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(chin_03_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.chin_03_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.chin_03_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.chin_03_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(chinAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.chinPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.chinPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(chinAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.chinRotationx - 0.5f) * 20, 0, (umaDna.chinRotationz - 0.5f) * 20)));
        skeleton.SetScale(chinAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.chinSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.chinSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.chinSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(cheekbone_rAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.cheekbone_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.cheekbone_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(cheekbone_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.cheekbone_rRotationx - 0.5f) * 20, 0, (umaDna.cheekbone_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(cheekbone_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.cheekbone_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.cheekbone_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.cheekbone_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(brow_rAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.brow_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.brow_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(brow_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.brow_rRotationx - 0.5f) * 20, 0, (umaDna.brow_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(brow_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.brow_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.brow_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.brow_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(tailbrow_rAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.tailbrow_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.tailbrow_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(tailbrow_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.tailbrow_rRotationx - 0.5f) * 20, 0, (umaDna.tailbrow_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(tailbrow_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.tailbrow_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.tailbrow_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.tailbrow_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(canthus_rAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.canthus_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.canthus_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(canthus_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.canthus_rRotationx - 0.5f) * 20, 0, (umaDna.canthus_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(canthus_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.canthus_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.canthus_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.canthus_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(endeye_rAdjustHash,
                  new Vector3(
                      Mathf.Clamp((umaDna.endeye_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
                      Mathf.Clamp(0, -1, 1),
                       Mathf.Clamp((umaDna.endeye_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
                      );
        skeleton.SetRotation(endeye_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.endeye_rRotationx - 0.5f) * 20, 0, (umaDna.endeye_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(endeye_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.endeye_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.endeye_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.endeye_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(eyeAdjustHash,
          new Vector3(
              Mathf.Clamp((umaDna.eyePositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
              Mathf.Clamp(0, -1, 1),
               Mathf.Clamp((umaDna.eyePositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
              );
        skeleton.SetRotation(eyeAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.eyeRotationx - 0.5f) * 20, 0, (umaDna.eyeRotationz - 0.5f) * 20)));
        skeleton.SetScale(eyeAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.eyeSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.eyeSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.eyeSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(upeye_rAdjustHash,
          new Vector3(
              Mathf.Clamp((umaDna.upeye_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
              Mathf.Clamp(0, -1, 1),
               Mathf.Clamp((umaDna.upeye_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
              );
        skeleton.SetRotation(upeye_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.upeye_rRotationx - 0.5f) * 20, 0, (umaDna.upeye_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(upeye_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.upeye_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.upeye_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.upeye_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(loweye_rAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.loweye_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.loweye_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(loweye_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.loweye_rRotationx - 0.5f) * 20, 0, (umaDna.loweye_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(loweye_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.loweye_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.loweye_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.loweye_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(noseAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.nosePositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.nosePositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(noseAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.noseRotationx - 0.5f) * 20, 0, (umaDna.noseRotationz - 0.5f) * 20)));
        skeleton.SetScale(noseAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.noseSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.noseSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.noseSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(tipnoseAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.tipnosePositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.tipnosePositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(tipnoseAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.tipnoseRotationx - 0.5f) * 20, 0, (umaDna.tipnoseRotationz - 0.5f) * 20)));
        skeleton.SetScale(tipnoseAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.tipnoseSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.tipnoseSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.tipnoseSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(nose_upAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.nose_upPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.nose_upPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(nose_upAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.nose_upRotationx - 0.5f) * 20, 0, (umaDna.nose_upRotationz - 0.5f) * 20)));
        skeleton.SetScale(nose_upAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.nose_upSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.nose_upSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.nose_upSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(nasalnoseAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.nasalnosePositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.nasalnosePositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(nasalnoseAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.nasalnoseRotationx - 0.5f) * 20, 0, (umaDna.nasalnoseRotationz - 0.5f) * 20)));
        skeleton.SetScale(nasalnoseAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.nasalnoseSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.nasalnoseSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.nasalnoseSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(nosewing_rAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.nosewing_rPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.nosewing_rPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(nosewing_rAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.nosewing_rRotationx - 0.5f) * 20, 0, (umaDna.nosewing_rRotationz - 0.5f) * 20)));
        skeleton.SetScale(nosewing_rAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.nosewing_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.nosewing_rSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.nosewing_rSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(mouthAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.mouthPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.mouthPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(mouthAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.mouthRotationx - 0.5f) * 20, 0, (umaDna.mouthRotationz - 0.5f) * 20)));
        skeleton.SetScale(mouthAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.mouthSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.mouthSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.mouthSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(lipmouthAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.lipmouthPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.lipmouthPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(lipmouthAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.lipmouthRotationx - 0.5f) * 20, 0, (umaDna.lipmouthRotationz - 0.5f) * 20)));
        skeleton.SetScale(lipmouthAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.lipmouthSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.lipmouthSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.lipmouthSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(upmouthAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.upmouthPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.upmouthPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(upmouthAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.upmouthRotationx - 0.5f) * 20, 0, (umaDna.upmouthRotationz - 0.5f) * 20)));
        skeleton.SetScale(upmouthAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.upmouthSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.upmouthSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.upmouthSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

        skeleton.SetPositionRelative(lowmouthAdjustHash,
  new Vector3(
      Mathf.Clamp((umaDna.lowmouthPositionx - 0.5f) * 0.30f, 0.5f, 1.6f),
      Mathf.Clamp(0, -1, 1),
       Mathf.Clamp((umaDna.lowmouthPositionz - 0.5f) * 0.30f, 0.5f, 1.6f))
      );
        skeleton.SetRotation(lowmouthAdjustHash,
                            Quaternion.Euler(new Vector3((umaDna.lowmouthRotationx - 0.5f) * 20, 0, (umaDna.lowmouthRotationz - 0.5f) * 20)));
        skeleton.SetScale(lowmouthAdjustHash,
                          new Vector3(
            Mathf.Clamp(1 + (umaDna.lowmouthSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.lowmouthSize - 0.5f) * 1.50f, 0.6f, 1.5f),
            Mathf.Clamp(1 + (umaDna.lowmouthSize - 0.5f) * 1.50f, 0.6f, 1.5f)));

    }
}
