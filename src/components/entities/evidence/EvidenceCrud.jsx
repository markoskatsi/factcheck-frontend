import { API } from "../../api/API.js";

export default function EvidenceCrud({
  setIsLoading,
  reloadEvidences,
  evidenceEndpoint,
  closeModal,
}) {
  const handleAddEvidence = async (evidence) => {
    setIsLoading(true);
    let data;
    if (!evidence.EvidenceURL && !evidence.file) {
    }
    if (evidence.file) {
      data = new FormData();
      data.append("file", evidence.file);
      data.append("EvidenceID", evidence.EvidenceID);
      data.append("EvidenceFilename", evidence.EvidenceFilename);
      data.append("EvidenceDescription", evidence.EvidenceDescription);
      data.append("EvidenceEvidencetypeID", evidence.EvidenceEvidencetypeID);
      data.append("EvidenceAnnotationID", evidence.EvidenceAnnotationID);
    } else {
      data = evidence;
    }
    const response = await API.post(`${evidenceEndpoint}`, data);
    if (response.isSuccess) {
      closeModal();
      console.log(evidenceEndpoint);
      await reloadEvidences(evidenceEndpoint);
    }
    setIsLoading(false);
    return response.isSuccess;
  };

  const handleModifyEvidence = async (evidence) => {
    setIsLoading(true);
    let data;
    if (!evidence.EvidenceURL && !evidence.file) {
    }
    if (evidence.file) {
      data = new FormData();
      data.append("file", evidence.file);
      data.append("EvidenceID", evidence.EvidenceID);
      data.append("EvidenceFilename", evidence.EvidenceFilename);
      data.append("EvidenceDescription", evidence.EvidenceDescription);
      data.append("EvidenceEvidencetypeID", evidence.EvidenceEvidencetypeID);
      data.append("EvidenceAnnotationID", evidence.EvidenceAnnotationID);
    } else {
      data = evidence;
    }
    const response = await API.put(
      `${evidenceEndpoint}/${evidence.EvidenceID}`,
      data,
    );
    if (response.isSuccess) {
      closeModal();
      console.log(evidenceEndpoint);
      await reloadEvidences(evidenceEndpoint);
    }
    setIsLoading(false);
    return response.isSuccess;
  };

  const handleDeleteEvidence = async (id) => {
    setIsLoading(true);
    const deleteResponse = await API.delete(
      `${evidenceEndpoint}/${id}`,
    );
    if (deleteResponse.isSuccess) {
      closeModal();
      await reloadEvidences(evidenceEndpoint);
    }
    setIsLoading(false);
    return deleteResponse.isSuccess;
  };

  return [handleAddEvidence, handleModifyEvidence, handleDeleteEvidence];
}
