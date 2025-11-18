import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link2, Calendar, MousePointerClick } from "lucide-react";
import { createUrl } from "../store/slices/urlSlice";
import { Modal, Button, Input, Alert } from "./ui";

export const CreateLinkModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.url);

  const [formData, setFormData] = useState({
    originalUrl: "",
    customSlug: "",
    expiresAt: "",
    maxClicks: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.originalUrl) {
      errors.originalUrl = "Original URL is required";
    } else {
      try {
        new URL(formData.originalUrl);
      } catch {
        errors.originalUrl = "Please enter a valid URL";
      }
    }

    if (formData.customSlug && !/^[a-zA-Z0-9-_]+$/.test(formData.customSlug)) {
      errors.customSlug =
        "Only letters, numbers, hyphens, and underscores allowed";
    }

    if (formData.expiresAt && new Date(formData.expiresAt) <= new Date()) {
      errors.expiresAt = "Must be a future date";
    }

    if (
      formData.maxClicks &&
      (isNaN(formData.maxClicks) || formData.maxClicks < 1)
    ) {
      errors.maxClicks = "Must be a positive number";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const urlData = {
      originalUrl: formData.originalUrl,
      customSlug: formData.customSlug || undefined,
      expiresAt: formData.expiresAt || undefined,
      maxClicks: formData.maxClicks ? parseInt(formData.maxClicks) : undefined,
    };

    console.log("Sending data:", urlData); // Debug log

    const result = await dispatch(createUrl(urlData));

    if (!result.error) {
      // Reset form and close modal
      setFormData({
        originalUrl: "",
        customSlug: "",
        expiresAt: "",
        maxClicks: "",
      });
      setFormErrors({});
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Short Link"
      size="md"
    >
      {error && <Alert type="error" message={error} className="mb-4" />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="url"
          name="originalUrl"
          label="Original URL"
          placeholder="https://example.com/your-long-url"
          value={formData.originalUrl}
          onChange={handleChange}
          error={formErrors.originalUrl}
          icon={Link2}
          required
        />

        <Input
          type="text"
          name="customSlug"
          label="Custom Slug (Optional)"
          placeholder="my-custom-link"
          value={formData.customSlug}
          onChange={handleChange}
          error={formErrors.customSlug}
          helperText="Leave empty to generate random slug"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="datetime-local"
            name="expiresAt"
            label="Expires At (Optional)"
            value={formData.expiresAt}
            onChange={handleChange}
            error={formErrors.expiresAt}
            icon={Calendar}
            helperText="Link expires after this date"
            min={new Date().toISOString().slice(0, 16)}
          />

          <Input
            type="number"
            name="maxClicks"
            label="Max Clicks (Optional)"
            placeholder="100"
            value={formData.maxClicks}
            onChange={handleChange}
            error={formErrors.maxClicks}
            icon={MousePointerClick}
            helperText="Link expires after N clicks"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            fullWidth
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth loading={isLoading}>
            Create Link
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateLinkModal;
