import { API } from "../../api/API.js";

export const AnnotationHandlers = ({
  setIsLoading,
  reloadAnnotation,
  annotationClaimEndpoint,
  closeModal,
}) => {
  const handleAddAnnotation = async (annotation) => {
    setIsLoading(true);
    const response = await API.post(`/annotations`, annotation);
    if (response.isSuccess) await reloadAnnotation(annotationClaimEndpoint);
    closeModal();
    setIsLoading(false);
    return response.isSuccess;
  };

  const handleModifyAnnotation = async (annotation) => {
    setIsLoading(true);
    const response = await API.put(
      `/annotations/${annotation.AnnotationID}`,
      annotation,
    );
    if (response.isSuccess) await reloadAnnotation(annotationClaimEndpoint);
    closeModal();
    setIsLoading(false);
    return response.isSuccess;
  };

  const handleDeleteAnnotation = async (annotation) => {
    setIsLoading(true);
    const deleteResponse = await API.delete(
      `/annotations/${annotation.AnnotationID}`,
    );
    if (deleteResponse.isSuccess)
      await reloadAnnotation(annotationClaimEndpoint);
    closeModal();
    setIsLoading(false);
    return deleteResponse.isSuccess;
  };

  return [handleAddAnnotation, handleModifyAnnotation, handleDeleteAnnotation];
}
